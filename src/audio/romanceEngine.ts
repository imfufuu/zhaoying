/*
 * RomanceEngine —— 浏览器内实时合成的钢琴小夜曲
 * D 大调 · 卡农式进行 · 每 3 秒一小节，温柔琶音 + 手写旋律乐句
 */

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

// 音级 -> midi（D5 为基音）
const DEG: Record<number, number> = {
  1: 74, 2: 76, 3: 78, 4: 79, 5: 81, 6: 83, 7: 85, 8: 86, 9: 88,
};

type MelodyNote = [deg: number, beats: number]; // deg=0 休止

// 每条 8 拍 = 2 小节
const PHRASES: MelodyNote[][] = [
  [[3, 1], [5, 1], [6, 1.5], [5, 0.5], [3, 1], [2, 1], [1, 2]],
  [[5, 1], [6, 1], [5, 0.5], [3, 0.5], [2, 1], [3, 1], [2, 1], [1, 2]],
  [[1, 1], [2, 1], [3, 1], [5, 1], [6, 2], [5, 1], [3, 1]],
  [[0, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 2]],
  [[6, 1], [8, 0.5], [7, 0.5], [6, 1], [5, 1], [3, 1], [5, 3]],
  [[5, 2], [3, 1], [2, 1], [1, 1], [2, 1], [3, 2]],
];

const CHORDS: { bass: number; tones: number[] }[] = [
  { bass: 38, tones: [62, 66, 69] }, // D
  { bass: 45, tones: [61, 64, 69] }, // A
  { bass: 47, tones: [62, 66, 71] }, // Bm
  { bass: 42, tones: [61, 66, 69] }, // F#m
  { bass: 43, tones: [62, 67, 71] }, // G
  { bass: 38, tones: [62, 66, 74] }, // D(+oct)
  { bass: 43, tones: [67, 71, 74] }, // G
  { bass: 45, tones: [64, 69, 73] }, // A
];

const BEAT = 0.78; // 秒
const BAR = BEAT * 4;

interface PhraseEvent { beat: number; dur: number; midi: number }

const PHRASE_EVENTS: PhraseEvent[][] = PHRASES.map((phrase) => {
  const events: PhraseEvent[] = [];
  let cursor = 0;
  for (const [deg, beats] of phrase) {
    if (deg > 0) events.push({ beat: cursor, dur: beats, midi: DEG[deg] });
    cursor += beats;
  }
  return events;
});

class RomanceEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private wet: GainNode | null = null;
  private timer: number | null = null;
  private barIndex = 0;
  private nextBarTime = 0;
  playing = false;

  private makeImpulse(ctx: AudioContext, seconds = 2.9) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const impulse = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
    }
    return impulse;
  }

  private piano(
    midi: number, time: number, dur: number, vel: number,
    opts: { bright?: number; send?: number; pan?: number } = {}
  ) {
    const ctx = this.ctx!;
    const f = mtof(midi);
    const bright = opts.bright ?? 1;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(vel, time + 0.014);
    g.gain.exponentialRampToValueAtTime(0.0004, time + dur);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = Math.min(6500, 1000 + vel * 4200 * bright);
    lp.Q.value = 0.4;

    const o1 = ctx.createOscillator();
    o1.type = "triangle";
    o1.frequency.value = f;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = f * 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.32;

    const pan = ctx.createStereoPanner();
    pan.pan.value = opts.pan ?? 0;

    o1.connect(lp);
    o2.connect(g2).connect(lp);
    lp.connect(g).connect(pan);
    pan.connect(this.master!);

    const send = ctx.createGain();
    send.gain.value = opts.send ?? 0.45;
    pan.connect(send).connect(this.wet!);

    o1.start(time); o2.start(time);
    o1.stop(time + dur + 0.1); o2.stop(time + dur + 0.1);
  }

  private pad(midis: number[], time: number, dur: number) {
    const ctx = this.ctx!;
    for (const m of midis) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = mtof(m - 12);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.022, time + dur * 0.4);
      g.gain.linearRampToValueAtTime(0.0001, time + dur);
      o.connect(g).connect(this.wet!);
      o.start(time);
      o.stop(time + dur + 0.05);
    }
  }

  private scheduleBar(bar: number, t0: number) {
    const chord = CHORDS[bar % CHORDS.length];
    const human = () => (Math.random() - 0.5) * 0.018;
    const hv = () => 0.88 + Math.random() * 0.24;

    // 贝斯 —— 深沉坚定
    this.piano(chord.bass, t0 + human(), BAR * 0.98, 0.22 * hv(), { bright: 0.5, send: 0.3 });

    // 琶音 —— 八分音符阶梯，第五拍泛一个高八度
    const steps = [0, 1, 2, 1, 2, 0, 1, 2];
    steps.forEach((s, i) => {
      let midi = chord.tones[s];
      if (i === 5) midi += 12;
      if (i === 7 && bar % 4 === 3) midi = chord.tones[2] + 12;
      this.piano(midi, t0 + i * (BAR / 8) + human(), 1.7, 0.13 * hv(), {
        send: 0.5, pan: -0.12 + i * 0.035,
      });
    });

    // 和声薄雾
    this.pad([chord.tones[0], chord.tones[2]], t0, BAR * 1.05);

    // 旋律 —— 每两小节一句，乐句循环
    const phraseIdx = Math.floor(bar / 2) % PHRASE_EVENTS.length;
    const offset = (bar % 2) * 4;
    for (const ev of PHRASE_EVENTS[phraseIdx]) {
      const b = ev.beat;
      if (b >= offset && b < offset + 4) {
        const t = t0 + (b - offset) * BEAT + human() * 1.4;
        const isHigh = ev.midi >= 83;
        this.piano(ev.midi, t, ev.dur * BEAT * 1.9, (isHigh ? 0.16 : 0.2) * hv(), {
          bright: 1.15, send: 0.72, pan: 0.15,
        });
        // 泛一个柔柔的高八度尾音
        this.piano(ev.midi + 12, t + 0.005, ev.dur * BEAT * 1.2, 0.045, { send: 0.85, pan: 0.2 });
      }
    }
  }

  async start() {
    if (this.playing) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -20;
      comp.ratio.value = 5;
      comp.connect(this.ctx.destination);

      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(comp);

      const convolver = this.ctx.createConvolver();
      convolver.buffer = this.makeImpulse(this.ctx);
      this.wet = this.ctx.createGain();
      this.wet.gain.value = 1;
      this.wet.connect(convolver).connect(comp);
    }
    await this.ctx.resume();

    this.playing = true;
    this.master!.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master!.gain.setTargetAtTime(0.92, this.ctx.currentTime, 1.4);

    this.barIndex = Math.floor(Math.random() * 4); // 每次从不同的季节开始
    this.nextBarTime = this.ctx.currentTime + 0.15;

    const tick = () => {
      if (!this.playing || !this.ctx) return;
      while (this.nextBarTime < this.ctx.currentTime + 0.5) {
        this.scheduleBar(this.barIndex, this.nextBarTime);
        this.barIndex++;
        this.nextBarTime += BAR;
      }
    };
    tick();
    this.timer = window.setInterval(tick, 120);
  }

  stop() {
    if (!this.playing || !this.ctx) return;
    this.playing = false;
    this.master!.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    window.setTimeout(() => {
      if (!this.playing) this.ctx?.suspend();
    }, 1600);
  }
}

export const romance = new RomanceEngine();
export { RomanceEngine };
