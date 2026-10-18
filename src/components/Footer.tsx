import { motion } from "framer-motion";
import { ArrowUp, Music2 } from "lucide-react";
import { COUPLE } from "../data/story";
import { scrollToTop } from "../lib/scroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pb-12 pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(242,217,214,0.8),transparent_65%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto h-16 w-16 rounded-[10px] border-2 border-wine/80"
        >
          <span className="font-brush grid h-full w-full -rotate-45 place-items-center text-3xl text-wine">
            囍
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="font-brush mt-10 text-5xl text-ink md:text-6xl"
        >
          结婚纪念日快乐
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-6 text-sm leading-[2.2] tracking-[0.25em] text-ink-soft"
        >
          愿有岁月可回首，且以深情共白头
          <br />
          <span className="text-wine">张迪钊</span> 与 <span className="text-wine">薛婉莹</span>，往后的每一个 4 个月 16 天，也要一起数完。
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-8 flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-ink-soft/80"
        >
          <p>{COUPLE.school} · 始于初二 · {COUPLE.weddingText} 结为夫妻</p>
          <p className="flex items-center gap-2">
            <Music2 className="h-3.5 w-3.5 text-gold" />
            背景音乐 · 为这一刻现场合成的钢琴小夜曲
          </p>
        </motion.div>

        <button
          onClick={scrollToTop}
          data-hover
          className="u-sweep mx-auto mt-12 flex items-center gap-2 text-[11px] tracking-[0.4em] text-ink transition-colors hover:text-wine"
        >
          <ArrowUp className="h-4 w-4" />
          回到故事开始的地方
        </button>

        <p className="font-latin mt-10 text-[10px] italic tracking-[0.35em] text-ink-soft/60">
          D & X · FOREVER AND A DAY · MMXXVI
        </p>
      </div>
    </footer>
  );
}
