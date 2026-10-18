import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { TIMELINE } from "../data/story";

const EASE = [0.22, 1, 0.36, 1] as const;

function Node({ accent }: { accent?: boolean }) {
  if (accent) {
    return (
      <span className="absolute left-1/2 top-1 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center">
        <span className="absolute inset-0 rotate-45 rounded-[6px] bg-wine shadow-[0_10px_25px_-8px_rgba(158,44,51,0.8)]" />
        <span className="font-brush relative text-xl text-ivory">囍</span>
      </span>
    );
  }
  return (
    <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
      <span className="block h-3.5 w-3.5 rotate-45 border border-gold bg-ivory shadow-[0_0_0_5px_rgba(247,241,232,1)]" />
    </span>
  );
}

function Item({
  item, i,
}: {
  item: (typeof TIMELINE)[number];
  i: number;
}) {
  const left = i % 2 === 0;
  return (
    <div className={`relative flex ${left ? "md:justify-start" : "md:justify-end"}`}>
      <div className="hidden md:block">
        <Node accent={item.accent} />
      </div>
      <motion.article
        initial={{ opacity: 0, x: left ? -46 : 46, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className={`relative mt-10 w-full pl-10 md:mt-0 md:w-[calc(50%-3.5rem)] md:pl-0 ${
          left ? "md:text-right" : ""
        }`}
      >
        {item.image && (
          <motion.figure
            initial={{ opacity: 0, rotate: 8, y: 20 }}
            whileInView={{ opacity: 1, rotate: 6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className={`absolute -top-16 hidden w-32 rotate-6 border-[6px] border-paper bg-paper shadow-[0_18px_45px_-15px_rgba(51,37,32,0.5)] md:block ${
              left ? "-right-6" : "-left-6"
            }`}
            data-hover
          >
            <img src={item.image} alt="" className="block aspect-[3/4] w-full object-cover" />
          </motion.figure>
        )}

        <p className={`flex items-center gap-3 text-[10px] tracking-[0.4em] text-gold md:text-[11px] ${left ? "md:justify-end" : ""}`}>
          <span className="font-brush text-2xl text-rose">{item.index}</span>
          {item.dateLabel}
          <span className="h-px w-8 bg-gold/50" />
        </p>
        <h3 className={`mt-3 text-2xl font-bold md:text-3xl ${item.accent ? "text-wine" : "text-ink"}`}>
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-[2] text-ink-soft md:text-[15px] md:leading-[2.1] md:max-w-none md:inline-block">
          {item.text}
        </p>
      </motion.article>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-latin text-[11px] italic tracking-[0.5em] text-gold"
          >
            OUR STORY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-brush mt-4 text-5xl text-ink md:text-6xl"
          >
            我们的故事
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-xs tracking-[0.35em] text-ink-soft"
          >
            从莘松中学初二那年写起 · 一直写进红本本
          </motion.p>
        </div>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-ink/10 md:left-1/2" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-rose via-wine to-gold md:left-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((item, i) => (
              <Item key={item.index} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
