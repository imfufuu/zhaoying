import type Lenis from "lenis";

let lenisRef: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  lenisRef = l;
}

export function scrollToTop() {
  if (lenisRef) lenisRef.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
