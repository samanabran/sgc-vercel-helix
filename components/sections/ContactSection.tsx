import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Globe, Mail, Phone } from "lucide-react";
import GoldDrawIn from "@/components/ui/GoldDrawIn";
import LivingCard from "@/components/ui/LivingCard";
import ProximityCtaButton from "@/components/ui/ProximityCtaButton";
import ScrollParallax from "@/components/ui/ScrollParallax";
import SheenLayer from "@/components/ui/SheenLayer";

const options = [
  {
    eyebrow: "OPTION A · FROM AED 5,000",
    title: "Finance Operations Audit",
    body: "We audit your finance operations, compliance posture, and reporting — regardless of what systems you run. VAT, Corporate Tax, PDPL, goAML, RERA, financial visibility, and operational time-waste. Diagnosed by a finance-credentialed team. 50% of the audit fee is credited to implementation if you proceed within 90 days.",
    bestWhen: "'I want to know exactly what's broken before I buy anything.'",
    cta: "Book a Finance Operations Audit →",
    href: "mailto:info@sgctech.ai?subject=Finance%20Operations%20Audit%20Request",
  },
  {
    eyebrow: "OPTION B · FROM AED 15,000",
    title: "Direct Implementation",
    body: "Start with a Discovery workshop next week. Order Form within 10 working days. Go-live within your tier's timeline. Go-live guarantee in writing.",
    bestWhen: "'We've decided. We need to move now.'",
    cta: "Start Discovery →",
    href: "mailto:info@sgctech.ai?subject=Direct%20Implementation%20Request",
    featured: true,
  },
  {
    eyebrow: "OPTION C · FREE · 30 MIN",
    title: "Founder Call",
    body: "Have specific questions, technical concerns, or stakeholders not in this room? Book a deep-dive directly with the founder.",
    bestWhen: "'I need to walk my CFO through this first.'",
    cta: "Book a Founder Call",
    href: "mailto:info@sgctech.ai?subject=Founder%20Call%20Request",
  },
];

const nextSteps = [
  {
    number: "①",
    heading: "You reach out",
    body: "No form. Just email.",
  },
  {
    number: "②",
    heading: "We respond",
    body: "Within one business day. Founder-level. Not a sales rep.",
  },
  {
    number: "③",
    heading: "You get a clear answer",
    body: '"We can help — here\'s how." Or honestly: "We can\'t."',
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 bg-[var(--sgc-black)] py-24 md:py-32 lg:py-40"
    >
      <ScrollParallax amplitude={20} className="pointer-events-none absolute inset-0">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(199,162,58,0.08)_0%,transparent_50%)]" />
      </ScrollParallax>
      <GoldDrawIn />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <RevealOnScroll>
          <SectionEyebrow label="NEXT STEPS" />
          <h2
            id="contact-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] text-[var(--sgc-text-primary)]"
          >
            Three ways to start. Pick one today.
          </h2>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mt-5 max-w-[42rem] text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium leading-[1.5] text-[var(--sgc-text-muted)]"
          >
            Each option is non-binding until an Order Form is signed.
          </p>
        </RevealOnScroll>

        {/* What happens next */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {nextSteps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={0.1 + index * 0.1}>
              <LivingCard>
                <div className="h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 transition duration-300 ease-out hover:-translate-y-[3px] hover:border-[rgba(199,162,58,0.3)] hover:shadow-[0_8px_24px_rgba(199,162,58,0.08)]">
                  <p
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="text-[1.1rem] font-bold text-[rgba(199,162,58,0.7)]"
                  >
                    {step.number}
                  </p>
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="mt-2 text-[0.95rem] font-semibold text-[var(--sgc-text-primary)]"
                  >
                    {step.heading}
                  </p>
                  <p className="mt-1 text-[0.85rem] leading-[1.6] text-[var(--sgc-text-muted)]">
                    {step.body}
                  </p>
                </div>
              </LivingCard>
            </RevealOnScroll>
          ))}
        </div>

        <div className="my-16 grid gap-6 md:grid-cols-3">
          {options.map((option, index) => (
            <RevealOnScroll key={option.title} delay={index * 0.1}>
              <LivingCard>
              <article
                className={`relative flex min-h-[26rem] flex-col rounded-2xl border bg-[var(--surface)] p-8 transition duration-300 ease-out hover:border-[var(--accent-copper)] ${
                  option.featured
                    ? "border-[var(--accent)] shadow-[0_0_30px_rgba(199,162,58,0.25)]"
                    : "border-[var(--border)]"
                }`}
              >
                {option.featured && <SheenLayer />}
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-copper)]"
                >
                  {option.eyebrow}
                </p>
                <h3
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="mt-4 text-[1.5rem] font-bold text-[var(--sgc-text-primary)]"
                >
                  {option.title}
                </h3>
                <p className="mt-4 max-w-prose text-[0.95rem] leading-[1.7] text-[var(--sgc-text-muted)]">
                  {option.body}
                </p>
                <p className="mt-4 text-[0.85rem] font-semibold text-[var(--text-secondary)]">
                  Best when: {option.bestWhen}
                </p>

                {option.featured ? (
                  <ProximityCtaButton
                    href={option.href}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[0.9rem] font-semibold transition duration-300 ease-out bg-[var(--sgc-gradient-brand)] text-[var(--sgc-black)] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(199,162,58,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {option.cta}
                  </ProximityCtaButton>
                ) : (
                  <a
                    href={option.href}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[0.9rem] font-semibold transition duration-300 ease-out border border-[rgba(199,162,58,0.3)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[rgba(199,162,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {option.cta}
                  </a>
                )}
              </article>
              </LivingCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Founder presence block */}
        <RevealOnScroll>
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-high)] p-8 md:p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                {/* Gold diamond frame photo placeholder */}
                <div
                  aria-hidden
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm border border-[rgba(199,162,58,0.4)] bg-[rgba(199,162,58,0.04)]"
                >
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                    <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="#C7A23A" strokeWidth="1.5" />
                    <polygon points="18,8 28,18 18,28 8,18" fill="#C7A23A" fillOpacity="0.15" stroke="#C7A23A" strokeWidth="0.75" />
                    <circle cx="18" cy="18" r="3" fill="#C7A23A" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="text-[1.15rem] font-bold text-[var(--sgc-text-primary)]"
                  >
                    Renbran Anthony Madelo, CMA
                  </p>
                  <p className="mt-0.5 text-[0.88rem] text-[var(--sgc-text-muted)]">
                    Operating Co-Founder · SGC Tech AI
                  </p>
                  <p className="mt-1.5 text-[0.85rem] leading-[1.6] text-[var(--sgc-text-muted)]">
                    CMA · AI/ML · 200+ apps built. I bridge finance and technology.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:info@sgctech.ai"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-high)] px-4 py-2 text-[0.85rem] font-medium text-[var(--sgc-text-primary)] transition duration-300 ease-out hover:border-[var(--accent)] hover:bg-[rgba(199,162,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Mail size={14} className="text-[var(--text-secondary)]" />
                  info@sgctech.ai
                </a>
                <a
                  href="mailto:info@sgctech.ai?subject=Phone%20Callback%20Request"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-high)] px-4 py-2 text-[0.85rem] font-medium text-[var(--sgc-text-primary)] transition duration-300 ease-out hover:border-[var(--accent)] hover:bg-[rgba(199,162,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Phone size={14} className="text-[var(--text-secondary)]" />
                  Request callback
                </a>
                <a
                  href="https://sgctech.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-high)] px-4 py-2 text-[0.85rem] font-medium text-[var(--sgc-text-primary)] transition duration-300 ease-out hover:border-[var(--accent)] hover:bg-[rgba(199,162,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Globe size={14} className="text-[var(--text-secondary)]" />
                  sgctech.ai
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
