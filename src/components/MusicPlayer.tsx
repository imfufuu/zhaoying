import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import { romance } from "../audio/romanceEngine";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 9000);
    return () => window.clearTimeout(t);
  }, []);

  const toggle = async () => {
    setHint(false);
    if (playing) {
      romance.stop();
      setPlaying(false);
    } else {
      await romance.start();
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex items-center gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {hint && !playing && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none whitespace-nowrap rounded-full border border-gold/30 bg-paper/90 px-4 py-2 shadow-[0_8px_30px_-12px_rgba(158,44,51,0.4)] backdrop-blur"
          >
            <span className="text-xs tracking-[0.25em] text-ink-soft">
              点开 · 为你写的小夜曲
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        data-hover
        aria-label={playing ? "暂停音乐" : "播放音乐"}
        className="group relative grid h-14 w-14 place-items-center"
      >
        {/* attention ring */}
        {!playing && (
          <span className="animate-pulse-ring absolute inset-0 rounded-full border border-wine/50" />
        )}
        {/* vinyl */}
        <span
          className={`animate-vinyl absolute inset-0 rounded-full border-[3px] border-wine-deep/90 bg-[radial-gradient(circle_at_center,#fdfaf3_0%,#fdfaf3_26%,transparent_27%),repeating-radial-gradient(circle_at_center,#2b1c19_0px,#2b1c19_2px,#3a2622_3px,#3a2622_5px)] shadow-[0_14px_35px_-10px_rgba(90,30,30,0.55)] transition-transform duration-500 group-hover:scale-105 ${playing ? "playing" : ""}`}
        />
        {/* label */}
        <span className="relative z-10 grid h-5 w-5 place-items-center rounded-full bg-wine">
          {playing ? (
            <span className="flex items-end gap-[2px]" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="eq-bar block h-2.5 w-[2px] bg-ivory"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </span>
          ) : (
            <Music className="h-3 w-3 text-ivory" strokeWidth={2.4} />
          )}
        </span>
      </button>
    </div>
  );
}
