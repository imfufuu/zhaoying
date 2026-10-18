import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { COUPLE } from "../data/story";

const EASE = [0.22, 1, 0.36, 1] as const;

const lineWrap = {
  hidden: {},
  show: (d: number) => ({ transition: { delay: d, staggerChildren: 0.02 } }),
};
const lineInner = {
  hidden: { y: "115%", rotate: 2 },
  show: (d: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE, delay: d },
  }),
};

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yCenter = useTransform(scrollY, [0, 700], [0, 130]);
  const oCenter = useTransform(scrollY, [0, 480], [1, 0]);
  const yGhost = useTransform(scrollY, [0, 700], [0, -60]);
  const state = ready ? "show" : "hidden";

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
      {/* ambient washes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,217,214,0.7),transparent_65%)]" />
        <div className="absolute -left-40 -top-40 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(216,185,138,0.35),transparent_60%)]" />
        <div className="absolute -bottom-48 -right-32 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(217,142,142,0.4),transparent_62%)]" />
      </div>

      {/* ghost typography */}
      <motion.div style={{ y: yGhost }} className="pointer-events-none absolute inset-0 select-none">
        <span className="vertical-rl font-brush absolute left-[3%] top-1/2 -translate-y-1/2 text-[clamp(3rem,7vw,6rem)] text-blush/70">
          一见钟情
        </span>
        <span className="vertical-rl font-brush absolute right-[3%] top-1/2 -translate-y-1/2 text-[clamp(3rem,7vw,6rem)] text-blush/70">
          往后余生
        </span>
        <span className="font-latin absolute -bottom-[4vw] left-1/2 -translate-x-1/2 text-[22vw] font-semibold italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(179,137,78,0.18)] md:text-[17vw]">
          2026
        </span>
      </motion.div>

      {/* top bar */}
      <motion.header
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        animate={state}
        className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8"
      >
        <div className="flex items-center gap-3" data-hover>
          <img
            src={`${import.meta.env.BASE_URL}images/badge.webp`}
            alt="上海市莘松中学校徽"
            className="h-11 w-11 rounded-full bg-white/70 object-contain p-1 shadow-[0_6px_20px_-8px_rgba(158,44,51,0.45)] ring-1 ring-gold/40"
          />
          <div className="h-8 w-px bg-ink/15" />
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-ink md:text-sm">
              {COUPLE.school}
            </p>
            <p className="font-latin mt-0.5 text-[9px] italic tracking-[0.22em] text-ink-soft/80 md:text-[10px]">
              WHERE WE FIRST MET
            </p>
          </div>
        </div>
        <p className="font-latin hidden text-[11px] tracking-[0.35em] text-ink-soft sm:block">
          LOVE AT FIRST SIGHT · <span className="italic text-wine">MMXXVI</span>
        </p>
      </motion.header>

      {/* center composition */}
      <motion.div
        style={{ y: yCenter, opacity: oCenter }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          animate={state}
          className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.6em] text-ink-soft md:text-xs"
        >
          <span className="h-px w-10 bg-gold/60 md:w-16" />
          初 二 初 见 · 一 生 为 期
          <span className="h-px w-10 bg-gold/60 md:w-16" />
        </motion.p>

        <h1 className="relative w-max max-w-full whitespace-nowrap font-bold leading-[0.98]">
          <motion.div variants={lineWrap} initial="hidden" animate={state} className="overflow-hidden">
            <motion.div variants={lineInner} custom={0.65} className="whitespace-nowrap text-[clamp(4rem,12vw,11rem)] text-ink">
              张迪钊
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1.05}
            initial="hidden"
            animate={state}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="font-latin inline-block -rotate-6 text-[15vw] font-medium italic text-gold drop-shadow-[0_6px_14px_rgba(179,137,78,0.35)] md:text-[7.5rem]">
              &
            </span>
          </motion.div>

          <motion.div variants={lineWrap} initial="hidden" animate={state} className="overflow-hidden md:pl-[16%]">
            <motion.div variants={lineInner} custom={0.85} className="whitespace-nowrap text-[clamp(4rem,12vw,11rem)] text-wine">
              薛婉莹
            </motion.div>
          </motion.div>
        </h1>

        <motion.div
          variants={fadeUp}
          custom={1.35}
          initial="hidden"
          animate={state}
          className="mt-8 flex items-center gap-3 md:mt-10"
        >
          <span className="text-[11px] tracking-[0.3em] text-ink-soft md:text-xs">{COUPLE.himTag}</span>
          <Heart className="h-3.5 w-3.5 fill-wine text-wine" />
          <span className="text-[11px] tracking-[0.3em] text-ink-soft md:text-xs">{COUPLE.herTag}</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={1.55}
          initial="hidden"
          animate={state}
          className="font-brush mt-4 text-2xl text-wine/90 md:text-3xl"
        >
          一见钟情 · 往后余生
        </motion.p>
      </motion.div>

      {/* rotating seal */}
      <motion.div
        variants={fadeUp}
        custom={1.8}
        initial="hidden"
        animate={state}
        className="absolute bottom-24 right-6 z-10 hidden md:block md:right-14"
        data-hover
      >
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full">
            <defs>
              <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
            </defs>
            <text className="fill-wine-deep/90" style={{ fontSize: 13.5, letterSpacing: 4, fontFamily: "Cormorant Garamond, serif" }}>
              <textPath href="#circ">
                DIZHAO × WANYING · XINSONG · EST. 2026 · FOREVER
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <img
              src={`${import.meta.env.BASE_URL}images/badge.webp`}
              alt="校徽"
              className="h-16 w-16 rounded-full bg-white/80 object-contain p-1.5 shadow-[0_10px_30px_-10px_rgba(158,44,51,0.5)] ring-1 ring-gold/50"
            />
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate={state}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.45em] text-ink-soft/80">往下滑 · 时光开始</span>
        <span className="h-10 w-px overflow-hidden">
          <span className="animate-scroll-cue block h-full w-full bg-gradient-to-b from-wine to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
