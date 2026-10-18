import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { COUPLE } from "../data/story";

const EASE = [0.22, 1, 0.36, 1] as const;
const WEDDING = new Date(COUPLE.weddingISO);
const DAY = 86_400_000;

interface Elapsed {
  months: number;
  days: number;
  totalDays: number;
  hh: string;
  mm: string;
  ss: string;
  yearProgress: number;
}

function calc(): Elapsed {
  const now = new Date();
  let months = (now.getFullYear() - WEDDING.getFullYear()) * 12 + (now.getMonth() - WEDDING.getMonth());
  const anchor = new Date(WEDDING);
  anchor.setMonth(anchor.getMonth() + months);
  if (now < anchor) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }
  const days = Math.floor((now.getTime() - anchor.getTime()) / DAY);
  const totalMs = now.getTime() - WEDDING.getTime();
  const totalDays = Math.floor(totalMs / DAY);
  const rem = ((totalMs % DAY) + DAY) % DAY;
  const hh = String(Math.floor(rem / 3_600_000)).padStart(2, "0");
  const mm = String(Math.floor((rem % 3_600_000) / 60_000)).padStart(2, "0");
  const ss = String(Math.floor((rem % 60_000) / 1000)).padStart(2, "0");
  const year = new Date(WEDDING);
  year.setFullYear(year.getFullYear() + 1);
  return { months, days, totalDays, hh, mm, ss, yearProgress: Math.min(1, totalMs / (year.getTime() - WEDDING.getTime())) };
}

function FlipNumber({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "62%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-62%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (d: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1, ease: EASE, delay: d },
  }),
};

export default function Counter() {
  const [e, setE] = useState<Elapsed>(() => calc());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const barRef = useRef<HTMLDivElement>(null);
  const barInView = useInView(barRef, { once: true });

  useEffect(() => {
    const t = window.setInterval(() => setE(calc()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const pct = useMemo(() => Math.round(e.yearProgress * 1000) / 10, [e.yearProgress]);

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/roses-texture.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />
      <span className="font-latin pointer-events-none absolute right-0 top-6 select-none text-[16vw] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(217,142,142,0.35)]">
        time
      </span>

      <div ref={ref} className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p
          variants={reveal} custom={0} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex items-center justify-center gap-4 text-[11px] tracking-[0.6em] text-gold"
        >
          <span className="h-px w-12 bg-gold/50" />
          今天 · 我们结婚的
          <span className="h-px w-12 bg-gold/50" />
        </motion.p>

        <motion.h2
          variants={reveal} custom={0.12} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-10 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2"
        >
          <span className="font-latin italic leading-none text-wine text-[clamp(6rem,18vw,13rem)]">
            <FlipNumber value={String(e.months)} />
          </span>
          <span className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-ink">个月</span>
          <span className="font-latin italic leading-none text-wine text-[clamp(6rem,18vw,13rem)]">
            <FlipNumber value={String(e.days)} />
          </span>
          <span className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-ink">天</span>
        </motion.h2>

        <motion.p
          variants={reveal} custom={0.25} initial="hidden" animate={inView ? "show" : "hidden"}
          className="font-latin mt-8 text-sm italic tracking-[0.25em] text-ink-soft md:text-base"
        >
          — since June 2<sup className="text-[0.6em]">nd</sup>, 2026 · {COUPLE.weddingText} —
        </motion.p>

        <motion.div
          variants={reveal} custom={0.35} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-ink/10 rounded-3xl border border-ink/10 bg-paper/70 py-7 shadow-[0_24px_60px_-30px_rgba(158,44,51,0.35)] backdrop-blur"
        >
          <div className="px-2">
            <p className="text-[10px] tracking-[0.35em] text-ink-soft md:text-xs">已经一起走过</p>
            <p className="font-latin mt-2 text-2xl text-ink md:text-4xl">
              <FlipNumber value={String(e.totalDays + 1)} />
              <span className="ml-1 text-sm md:text-base">天</span>
            </p>
          </div>
          <div className="px-2">
            <p className="text-[10px] tracking-[0.35em] text-ink-soft md:text-xs">此刻的幸福时长</p>
            <p className="font-latin mt-2 text-2xl text-ink tabular md:text-4xl">
              {e.hh}:{e.mm}<span className="text-wine">:</span>{e.ss}
            </p>
          </div>
          <div className="px-2">
            <p className="text-[10px] tracking-[0.35em] text-ink-soft md:text-xs">奔赴一周年</p>
            <p className="font-latin mt-2 text-2xl text-ink md:text-4xl">{pct}<span className="text-base md:text-lg">%</span></p>
          </div>
        </motion.div>

        <motion.div
          variants={reveal} custom={0.45} initial="hidden" animate={inView ? "show" : "hidden"}
          ref={barRef}
          className="mx-auto mt-8 max-w-3xl"
        >
          <div className="h-[5px] overflow-hidden rounded-full bg-ink/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={barInView ? { scaleX: e.yearProgress } : {}}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-rose via-wine to-gold"
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[0.3em] text-ink-soft/80">
            <span>2026.06.02</span>
            <span className="text-wine">我们在这里</span>
            <span>2027.06.02</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
