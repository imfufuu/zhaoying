import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rot: number;
  rotSpeed: number;
  color: string;
  alpha: number;
}

const COLORS = ["217,142,142", "230,170,168", "201,137,132", "216,185,138"];

export default function Petals({ density = 16 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;
    const petals: Petal[] = [];
    const count = window.innerWidth < 640 ? Math.floor(density * 0.55) : density;

    const spawn = (initial = false): Petal => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -30,
      size: 5 + Math.random() * 9,
      speedY: 0.35 + Math.random() * 0.65,
      swayAmp: 24 + Math.random() * 40,
      swayFreq: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.35 + Math.random() * 0.35,
    });

    for (let i = 0; i < count; i++) petals.push(spawn(true));

    const drawPetal = (p: Petal, t: number) => {
      ctx.save();
      const x = p.x + Math.sin(t * 0.001 * p.swayFreq + p.phase) * p.swayAmp;
      ctx.translate(x, p.y);
      ctx.rotate(p.rot + Math.sin(t * 0.0008 + p.phase) * 0.6);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.7, 0, s);
      ctx.bezierCurveTo(-s * 0.7, s * 0.7, -s * 0.9, -s * 0.6, 0, -s);
      ctx.fill();
      // vein
      ctx.strokeStyle = `rgba(255,255,255,${p.alpha * 0.35})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.8);
      ctx.quadraticCurveTo(s * 0.12, 0, 0, s * 0.8);
      ctx.stroke();
      ctx.restore();
    };

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y > h + 40) petals[i] = spawn();
        drawPetal(p, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden
    />
  );
}
