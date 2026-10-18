import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { setLenis } from "./lib/scroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Petals from "./components/Petals";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import Counter from "./components/Counter";
import Marquee from "./components/Marquee";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import LoveLetter from "./components/LoveLetter";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <div className="grain relative min-h-screen bg-ivory text-ink">
      <Cursor />
      <Petals />

      <AnimatePresence>
        {!ready && <Preloader onDone={() => setReady(true)} />}
      </AnimatePresence>

      <main>
        <Hero ready={ready} />
        <Counter />
        <Marquee />
        <Timeline />
        <Gallery />
        <LoveLetter />
        <Footer />
      </main>

      <MusicPlayer />
    </div>
  );
}
