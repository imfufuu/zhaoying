import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { LETTERS } from "../data/story";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardV = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  show: (d: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE, delay: d },
  }),
};
const lineV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const groupV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
};

function Letter({
  title, sign, lines, rotate, delay,
}: {
  title: string; sign: string; lines: string[]; rotate: string; delay: number;
}) {
  return (
    <motion.div
      variants={cardV}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={`group relative bg-paper px-8 py-10 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out hover:rotate-0 md:px-12 md:py-14 ${rotate}`}
      data-hover
    >
      <span className="pointer-events-none absolute inset-3 border border-gold/40" />
      <Feather className="h-5 w-5 text-gold" />
      <h3 className="font-brush mt-4 text-4xl text-ink">{title}</h3>
      <span className="mt-4 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />

      <motion.div
        variants={groupV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mt-8 space-y-2.5"
      >
        {lines.map((l, i) => (
          <motion.p key={i} variants={lineV} className="text-[15px] leading-[2.1] tracking-[0.12em] text-ink-soft">
            {l}
          </motion.p>
        ))}
      </motion.div>

      <p className="font-brush mt-10 text-right text-2xl text-wine">{sign}</p>
    </motion.div>
  );
}

export default function LoveLetter() {
  return (
    <section className="relative overflow-hidden bg-wine-deep py-28 md:py-40">
      {/* ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,142,142,0.18),transparent_60%)]" />
        <span className="font-brush absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[30vw] leading-none text-white/[0.04]">
          信
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-latin text-[11px] italic tracking-[0.5em] text-gold-soft"
          >
            LETTERS · 纸短情长
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-brush mt-4 text-5xl text-ivory md:text-6xl"
          >
            互写的一封信
          </motion.h2>
        </div>

        <div className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-16">
          <Letter title={LETTERS.toHer.title} sign={LETTERS.toHer.sign} lines={LETTERS.toHer.lines} rotate="md:-rotate-[1.6deg]" delay={0.1} />
          <Letter title={LETTERS.toHim.title} sign={LETTERS.toHim.sign} lines={LETTERS.toHim.lines} rotate="md:rotate-[1.6deg]" delay={0.3} />

          {/* wax seal between */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.34, 1.4, 0.5, 1], delay: 0.7 }}
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            data-hover
          >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c14a52,#8d242b_55%,#641820)] shadow-[inset_0_3px_9px_rgba(255,255,255,0.25),inset_0_-6px_12px_rgba(0,0,0,0.4),0_18px_40px_-10px_rgba(0,0,0,0.6)] ring-4 ring-[#641820]/40">
              <span className="font-brush text-4xl text-ivory drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">囍</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
