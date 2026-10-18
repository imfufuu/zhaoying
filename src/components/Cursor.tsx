import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100, y = -100, rx = -100, ry = -100;
    let scale = 1, targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[data-hover]");
      targetScale = interactive ? 2.4 : 1;
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-wine"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[119] h-9 w-9 rounded-full border border-wine/40 transition-[border-color]"
        aria-hidden
      />
    </>
  );
}
