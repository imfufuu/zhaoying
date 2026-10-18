import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else window.setTimeout(onDone, 650);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* seal */}
      <motion.div
        initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 45, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-24 w-24 rounded-[14px] border-2 border-wine/80"
      >
        <div className="absolute inset-2 rounded-[8px] border border-wine/30" />
        <span className="font-brush absolute inset-0 grid -rotate-45 place-items-center text-5xl text-wine">
          囍
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 text-sm tracking-[0.9em] text-ink-soft"
      >
        张迪钊 <span className="text-gold">×</span> 薛婉莹
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-px w-40 origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      <div className="font-latin mt-6 text-5xl italic text-gold tabular">
        {n}
        <span className="text-2xl">%</span>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-[11px] tracking-[0.5em] text-ink-soft/70"
      >
        上海市莘松中学 · 一见钟情纪念馆
      </motion.p>
    </motion.div>
  );
}
