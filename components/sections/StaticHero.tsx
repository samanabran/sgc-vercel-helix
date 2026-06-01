"use client";

import { GoldHairline } from "@/components/ui/GoldHairline";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const CREDENTIALS = [
  "Founded in Dubai",
  "IFZA-Licensed",
  "CPA",
  "CIA",
  "CRMA",
  "CIPFA",
  "ACCA",
  "M.Econ",
];

export default function StaticHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen w-full items-center justify-center bg-[var(--bg)] px-6 py-24"
    >
      {/* bottom divider */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(199,162,58,0.2)] to-transparent"
      />

      <RevealOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            Practitioner-Led Implementation · Dubai, UAE
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.08] text-[var(--text-primary)]"
          >
            The Odoo Firm Your CFO Would Have Founded.
          </h1>

          {/* Subhead */}
          <p
            className="mx-auto mt-6 max-w-[42rem] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.75] text-[var(--text-secondary)]"
          >
            We&apos;re CPAs and CIAs who got tired of watching brilliant businesses
            run ERP setups built by people who&apos;d never closed a UAE book.
            So we built a firm that fixes that.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GoldHairline>
              <a
                href="#contact"
                style={{ fontFamily: "var(--font-inter)" }}
                className="inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--bg)] transition-opacity duration-150 hover:opacity-90"
              >
                Book a Finance Operations Audit
              </a>
            </GoldHairline>

            <GoldHairline>
              <a
                href="#founder"
                style={{ fontFamily: "var(--font-inter)" }}
                className="inline-flex items-center gap-2 rounded-sm border border-[rgba(199,162,58,0.4)] px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--accent)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              >
                Meet the Founders
              </a>
            </GoldHairline>
          </div>

          {/* Credential line */}
          <p className="mt-10 font-mono text-[0.72rem] tracking-[0.12em] text-[var(--text-secondary)]">
            {CREDENTIALS.map((cred, i) => (
              <span key={cred}>
                {i > 0 && (
                  <span className="mx-2 text-[var(--accent)] opacity-70">·</span>
                )}
                {cred}
              </span>
            ))}
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
