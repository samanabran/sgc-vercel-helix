"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReducedMotionFallback from "./ReducedMotionFallback";
import CinematicCaption from "@/components/HelixSpiral/CinematicCaption";
import AudioToggle from "@/components/AudioToggle";
import { useHelixScrub } from "@/hooks/useHelixScrub";

gsap.registerPlugin(ScrollTrigger);

const HelixCanvas = dynamic(() => import("./HelixCanvas"), { ssr: false });

export default function DiamondScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const lastProgressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useHelixScrub(scrollProgressRef);

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleMotion);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      mq.removeEventListener("change", handleMotion);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          // Fade scroll hint on first scroll
          const hintOpacity = String(Math.max(0, 1 - self.progress * 40));
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = hintOpacity;
          }
          const nextIndex = Math.round(self.progress * 7);
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
          // Scroll velocity for reactive particles
          const now = performance.now();
          const dt = now - lastTimeRef.current;
          scrollVelocityRef.current =
            dt > 0 ? Math.abs(self.progress - lastProgressRef.current) / dt : 0;
          lastProgressRef.current = self.progress;
          lastTimeRef.current = now;
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  if (reducedMotion) {
    return <ReducedMotionFallback />;
  }

  const particleCount = isMobile ? 120 : 400;
  const diamondSize = isMobile ? 2.0 : 2.8;
  const strandSegments = isMobile ? 300 : 400;

  return (
    <div
      ref={containerRef}
      style={{ height: "600vh", position: "relative" }}
      onPointerMove={handleMouseMove}
    >
      {/* Full-bleed sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#080B11",
          zIndex: 1,
        }}
      >
        <HelixCanvas
          scrollProgressRef={scrollProgressRef}
          activeIndex={activeIndex}
          mouseRef={mouseRef}
          reducedMotion={reducedMotion}
          particleCount={particleCount}
          diamondSize={diamondSize}
          strandSegments={strandSegments}
          scrollVelocityRef={scrollVelocityRef}
        />
        {/* Edge vignette — darkens corners without blocking center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(8,11,17,0.65) 100%)",
          }}
        />
        {/* Audio toggle — top-right corner, above canvas */}
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 12,
          }}
        >
          <AudioToggle />
        </div>

        {/* HTML caption overlay — sits above the canvas */}
        <CinematicCaption activeIndex={activeIndex} />

        {/* Scroll hint — visible at scroll=0, fades immediately on scroll */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            pointerEvents: "none",
            textAlign: "center",
            opacity: 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <p style={{
            color: "#C7A23A",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-inter, sans-serif)",
            marginBottom: "0.6rem",
            opacity: 0.8,
          }}>
            Scroll to explore
          </p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ margin: "0 auto", display: "block", animation: "sgc-bounce 1.8s ease-in-out infinite" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" stroke="#C7A23A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <style>{`
            @keyframes sgc-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.6; }
              50% { transform: translateY(6px); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
