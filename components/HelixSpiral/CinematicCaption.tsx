"use client";

import { AnimatePresence, motion } from "motion/react";
import { DIAMONDS } from "./diamonds.config";

interface CinematicCaptionProps {
  activeIndex: number;
  scrollProgress: number;
}

export default function CinematicCaption({ activeIndex, scrollProgress }: CinematicCaptionProps) {
  const diamond = DIAMONDS[activeIndex];

  // Determine animation intensity based on scroll phase
  // During push-in and macro: more dramatic reveals
  const isDramatic = scrollProgress > 0.10 && scrollProgress < 0.25 ||
                     scrollProgress > 0.78 && scrollProgress < 0.92;

  // Caption vertical offset — rises higher during wide/retreat, lower during close-up
  const bottomOffset = isDramatic ? "4.5rem" : "3rem";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Bottom-left: counter + progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1rem, 4vh, 2.5rem)",
          left: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(199,162,58,0.6)",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;08
        </span>
        {/* Gold progress bar */}
        <div
          style={{
            width: "4rem",
            height: "1px",
            background: "rgba(199,162,58,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#C7A23A",
              transformOrigin: "left",
              transform: `scaleX(${(activeIndex + 1) / 8})`,
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Bottom-center: active diamond headline + subhead — cinematic reveal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{
            opacity: 0,
            y: isDramatic ? 28 : 16,
            filter: "blur(6px)",
            scale: isDramatic ? 0.96 : 1,
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -12,
            filter: "blur(4px)",
            scale: 0.98,
          }}
          transition={{
            duration: isDramatic ? 0.7 : 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: "absolute",
            bottom: bottomOffset,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            maxWidth: "min(640px, 80vw)",
            pointerEvents: "auto",
          }}
        >
          {/* Gold connection line — bridges active diamond to caption text */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              width: "1px",
              height: "36px",
              margin: "0 auto 0.875rem",
              background:
                "repeating-linear-gradient(to bottom, #C7A23A 0px, #C7A23A 4px, transparent 4px, transparent 8px)",
              transformOrigin: "top",
            }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-fraunces, serif)",
              fontSize: "clamp(1.1rem, 2vw, 1.65rem)",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "var(--text-primary, #F4F1E8)",
              textShadow: "0 2px 24px rgba(0,0,0,0.85)",
              marginBottom: "0.5rem",
            }}
          >
            {diamond.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
              lineHeight: 1.7,
              color: "rgba(199,162,58,0.8)",
              textShadow: "0 1px 12px rgba(0,0,0,0.9)",
            }}
          >
            {diamond.subhead}
          </motion.p>
          {diamond.isCTA && (
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                padding: "0.7rem 1.5rem",
                background: "var(--accent, #C7A23A)",
                color: "#080B11",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "2px",
                letterSpacing: "0.04em",
              }}
            >
              Book a Finance Operations Audit →
            </motion.a>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
