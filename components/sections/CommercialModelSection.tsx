"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldDrawIn from "@/components/ui/GoldDrawIn";

const LAYERS = [
  {
    label: "IMPLEMENTATION",
    price: "AED 15,000 from",
    note: "Foundation",
    optional: false,
    alwaysOn: false,
    description: "Discovery, configuration, UAT, go-live, hypercare. Fixed price, fixed timeline.",
  },
  {
    label: "PLATFORM SUBSCRIPTION",
    price: "AED 1,500/mo from",
    note: "Always on",
    optional: false,
    alwaysOn: true,
    description: "Odoo hosting, security patches, AI feature updates, compliance upgrades.",
  },
  {
    label: "OPERATIONS RETAINER",
    price: "AED 5,000/mo from",
    note: "Optional",
    optional: true,
    alwaysOn: false,
    description: "Named senior consultant, quarterly reviews, priority support.",
  },
];

// Fixed positions — no Math.random() at render time avoids SSR/hydration mismatch
const PARTICLES = [
  { left: "15%", top: "28%", delay: 0.0, dur: 3.8 },
  { left: "28%", top: "55%", delay: 0.5, dur: 4.2 },
  { left: "42%", top: "18%", delay: 1.0, dur: 3.5 },
  { left: "58%", top: "72%", delay: 0.3, dur: 4.5 },
  { left: "71%", top: "40%", delay: 0.8, dur: 3.9 },
  { left: "83%", top: "22%", delay: 1.3, dur: 4.1 },
  { left: "22%", top: "82%", delay: 0.6, dur: 3.6 },
  { left: "65%", top: "60%", delay: 1.6, dur: 4.3 },
  { left: "50%", top: "33%", delay: 0.2, dur: 3.7 },
  { left: "36%", top: "66%", delay: 1.1, dur: 4.0 },
];

interface SlabProps {
  layer: (typeof LAYERS)[number];
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function CommercialSlab({ layer, index, mouseX, mouseY }: SlabProps) {
  const depth = (index + 1) * 5;
  const rawX = useTransform(mouseX, [0, 1], [-depth, depth]);
  const rawY = useTransform(mouseY, [0, 1], [-depth * 0.5, depth * 0.5]);
  const shiftX = useSpring(rawX, { stiffness: 150, damping: 22 });
  const shiftY = useSpring(rawY, { stiffness: 150, damping: 22 });

  return (
    <RevealOnScroll delay={index * 0.15}>
      <motion.div
        style={{ x: shiftX, y: shiftY }}
        className={`relative rounded-xl border-[1px] border-l-2 bg-[var(--surface)] p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(199,162,58,0.1)] ${
          layer.optional
            ? "border-[rgba(199,162,58,0.18)] border-l-[rgba(199,162,58,0.3)] opacity-60 hover:opacity-75"
            : "border-[var(--border)] border-l-[var(--accent)]"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-copper)]"
          >
            {layer.label}
          </span>
          <div className="flex items-center gap-2">
            {layer.optional && (
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[0.68rem] tracking-[0.12em] text-[rgba(199,162,58,0.45)]"
              >
                OPTIONAL
              </span>
            )}
            {layer.alwaysOn && (
              <motion.span
                aria-label="Always on"
                className="block h-2 w-2 rounded-full bg-[var(--accent)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </div>

        <p
          style={{ fontFamily: "var(--font-inter)" }}
          className="text-gold-gradient mt-2 text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold leading-none"
        >
          {layer.price}
        </p>

        <p
          style={{ fontFamily: "var(--font-inter)" }}
          className="mt-3 text-[0.9rem] leading-[1.65] text-[var(--sgc-text-muted)]"
        >
          {layer.description}
        </p>
      </motion.div>
    </RevealOnScroll>
  );
}

export default function CommercialModelSection() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <section
      id="commercial-model"
      aria-labelledby="commercial-model-heading"
      className="scroll-mt-20 bg-[var(--sgc-black)] py-24 md:py-32 lg:py-40"
    >
      <GoldDrawIn />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <RevealOnScroll>
          <SectionEyebrow label="HOW WE WORK" />
          <h2
            id="commercial-model-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="max-w-3xl text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] text-[var(--sgc-text-primary)]"
          >
            The Three-Layer Commercial Model
          </h2>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mt-5 max-w-[42rem] text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium leading-[1.5] text-[var(--sgc-text-muted)]"
          >
            No hidden fees. No scope creep. Three clear layers that scale with you.
          </p>
        </RevealOnScroll>

        <div
          className="relative mt-16 max-w-3xl space-y-5"
          onPointerMove={reduced ? undefined : handlePointerMove}
          onPointerLeave={reduced ? undefined : handlePointerLeave}
        >
          {/* Floating gold particles — decorative only, reduced-motion skips */}
          {!reduced &&
            PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-[var(--accent)]"
                style={{ left: p.left, top: p.top }}
                animate={{ y: [0, -40, -80], opacity: [0, 0.45, 0] }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}

          {LAYERS.map((layer, i) => (
            <CommercialSlab
              key={layer.label}
              layer={layer}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>

        <RevealOnScroll delay={0.5}>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mt-10 max-w-3xl border-t border-[#3A3220] pt-6 text-[1rem] font-semibold leading-[1.6] text-[var(--sgc-text-primary)]"
          >
            We don&apos;t sell Implementation without Subscription.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
