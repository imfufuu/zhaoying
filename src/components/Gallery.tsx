import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera } from "lucide-react";
import { PHOTOS } from "../data/story";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const ySide = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const yQuote = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      {/* backdrop wash */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(242,217,214,0.4)_30%,rgba(242,217,214,0.4)_70%,transparent)]" />
      <span className="font-brush pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none text-[26vw] leading-none text-blush/40 md:text-[18vw]">
        相行
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-latin text-[11px] italic tracking-[0.5em] text-gold"
          >
            THE CORRIDOR · AFTER SCHOOL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-brush mt-4 text-5xl text-ink md:text-6xl"
          >
            放学后的楼道
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs tracking-[0.3em] text-ink-soft"
          >
            <Camera className="h-3.5 w-3.5 text-wine" />
            同学 摄 · 一张舍不得删的照片
          </motion.p>
        </div>

        <div className="mt-16 grid items-start gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* main photo */}
          <motion.div style={{ y: yMain }} className="md:col-span-7">
            <motion.figure
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <div className="group relative bg-paper p-3 pb-4 shadow-[0_40px_90px_-30px_rgba(51,37,32,0.5)] ring-1 ring-ink/5 md:p-4 md:pb-5" data-hover>
                <div className="pointer-events-none absolute inset-2 border border-gold/50 md:inset-2.5" />
                <div className="relative overflow-hidden">
                  <img
                    src={PHOTOS[0].src}
                    alt={PHOTOS[0].caption}
                    className="block aspect-[3/4] w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/25 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between px-2">
                  <span className="font-latin text-xs italic tracking-[0.25em] text-ink-soft md:text-sm">
                    {PHOTOS[0].label}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-ink-soft/80 md:text-xs">
                    {PHOTOS[0].caption}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          </motion.div>

          {/* side column */}
          <div className="md:col-span-5">
            <motion.blockquote
              style={{ y: yQuote }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="relative md:mt-20"
            >
              <span className="font-latin absolute -left-3 -top-10 text-8xl italic text-rose/60">"</span>
              <p className="font-brush text-3xl leading-snug text-wine md:text-4xl">
                照片有点糊，
                <br />
                心动很清晰。
              </p>
              <p className="mt-6 max-w-xs text-sm leading-[2.1] text-ink-soft">
                那天的晚霞透过玻璃铺满楼道，全世界都成了粉色的。我们并肩走着，谁都没有说话——
                大概都在偷偷希望，这条路长一点，再长一点。
              </p>
            </motion.blockquote>

            <motion.div style={{ y: ySide }} className="relative mt-14 md:mt-8 md:pl-16">
              <motion.figure
                initial={{ opacity: 0, y: 60, rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                className="relative -rotate-1 bg-paper p-2.5 pb-3 shadow-[0_30px_70px_-25px_rgba(51,37,32,0.45)] ring-1 ring-ink/5 md:rotate-2"
                data-hover
              >
                {/* tape */}
                <span className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-2deg] bg-blush/80 shadow-sm backdrop-blur-[1px]" />
                <div className="overflow-hidden">
                  <img
                    src={PHOTOS[1].src}
                    alt="把我们走成了画"
                    className="block aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between px-1">
                  <span className="font-latin text-xs italic tracking-[0.25em] text-ink-soft">
                    {PHOTOS[1].label}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-ink-soft/80">
                    {PHOTOS[1].caption}
                  </span>
                </figcaption>
              </motion.figure>
              <p className="font-brush mt-6 text-right text-xl text-rose md:pr-4">
                {PHOTOS[1].note}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
