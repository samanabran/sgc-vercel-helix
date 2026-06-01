import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  tickerFn = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function getLenis(): Lenis | null {
  return lenis;
}
