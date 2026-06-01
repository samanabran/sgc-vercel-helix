import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import StatCounter from "@/components/ui/StatCounter";
import GoldDrawIn from "@/components/ui/GoldDrawIn";
import LivingCard from "@/components/ui/LivingCard";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  displayValue?: string;
};

const stats: StatItem[] = [
  {
    value: 20,
    suffix: "%",
    label: "Admin Hours Saved",
    sublabel: "Reduction in admin hours · within 90 days",
  },
  {
    value: 60,
    suffix: "%",
    label: "Faster Monthly Close",
    sublabel: "8–12 days → 3–5 days",
  },
  {
    value: 5,
    suffix: " mo",
    displayValue: "4–6",
    label: "Typical Payback",
    sublabel: "Growth tier, Year 1",
  },
  {
    value: 10,
    suffix: " hrs/wk",
    label: "Returned to Founder",
    sublabel: "Across ops & finance",
  },
];

const comparisonRows = [
  {
    metric: "Monthly close",
    before: "8–12 working days",
    after: "3–5 working days",
  },
  {
    metric: "Commission / payroll cycle",
    before: "4–7 days, manual",
    after: "1–2 days, automated",
  },
  {
    metric: "Real-time business visibility",
    before: "Monthly close only",
    after: "Daily dashboard, live KPIs",
  },
  {
    metric: "Compliance reporting (RERA/VAT)",
    before: "Manual quarterly scramble",
    after: "One-click, audit-ready",
  },
  {
    metric: "Lead-to-deal traceability",
    before: "WhatsApp + memory",
    after: "Full CRM trail with AI scoring",
  },
];

export default function CaseStudySection() {
  return (
    <section
      id="case-study"
      aria-labelledby="case-study-heading"
      className="scroll-mt-20 bg-[var(--sgc-black)] py-24 md:py-32 lg:py-40"
    >
      <GoldDrawIn />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <RevealOnScroll>
          <SectionEyebrow label="PROOF" />
          <h2
            id="case-study-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] text-[var(--sgc-text-primary)]"
          >
            Conservative results we stand behind.
          </h2>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mt-5 max-w-[42rem] text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium leading-[1.5] text-[var(--sgc-text-muted)]"
          >
            These are the ranges we commit to for typical UAE mid-market clients on the Growth tier. Not best-case.
            Not hero numbers. The numbers we put in writing.
          </p>
        </RevealOnScroll>

        <div className="my-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 0.08} focusPull>
              <LivingCard>
              <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-gold-gradient text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none"
                >
                  {stat.displayValue ? (
                    <>
                      {stat.displayValue}
                      {stat.suffix}
                    </>
                  ) : (
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </p>
                <p className="mt-3 text-[0.85rem] font-medium uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-[0.78rem] text-[var(--sgc-text-muted)]">{stat.sublabel}</p>
              </article>
              </LivingCard>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll focusPull>
          <LivingCard>
          <div className="my-12 rounded-2xl border border-[rgba(62,150,179,0.3)] bg-[rgba(62,150,179,0.06)] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-[rgba(62,150,179,0.7)]" />
              <p
                style={{ fontFamily: "var(--font-inter)" }}
                className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-teal)]"
              >
                WHAT&apos;S POSSIBLE AT SCALE · ANONYMISED CASE
              </p>
            </div>

            <h3
              style={{ fontFamily: "var(--font-inter)" }}
              className="mt-4 text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-[var(--sgc-text-primary)]"
            >
              UAE real-estate brokerage, full deployment
            </h3>

            <p className="mt-3 text-[0.9rem] leading-[1.7] text-[var(--sgc-text-muted)]">
              A mid-size UAE real-estate brokerage. 30 agents. Operating on Excel commissions, manual SPA data
              entry, and WhatsApp as a CRM. We audited in month one, implemented in months two and three. The
              numbers below are from year one of live operation — verified, not projected. Full audit trail
              available under NDA.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[1.75rem] font-extrabold text-[var(--sgc-text-primary)]"
                >
                  AED 1.15B
                </p>
                <p className="mt-1 text-[0.8rem] text-[var(--sgc-text-muted)]">Sales volume processed</p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[1.75rem] font-extrabold text-[var(--sgc-text-primary)]"
                >
                  580
                </p>
                <p className="mt-1 text-[0.8rem] text-[var(--sgc-text-muted)]">Real-estate deals</p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[1.75rem] font-extrabold text-[var(--sgc-text-primary)]"
                >
                  104%
                </p>
                <p className="mt-1 text-[0.8rem] text-[var(--sgc-text-muted)]">Year-1 ROI</p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[1.75rem] font-extrabold text-[var(--sgc-text-primary)]"
                >
                  5.9 mo
                </p>
                <p className="mt-1 text-[0.8rem] text-[var(--sgc-text-muted)]">Payback</p>
              </div>
            </div>

            <p className="mt-6 text-[0.88rem] leading-[1.7] text-[var(--sgc-text-muted)]">
              This is the ceiling, not the average. Most clients see{" "}
              <span className="font-semibold text-[var(--sgc-text-primary)]">20–40% of these gains in Year 1</span>{" "}
              — which is still a strong return. Client identity protected under NDA. Reference call available on
              request after Discovery.
            </p>
          </div>
          </LivingCard>
        </RevealOnScroll>

        <RevealOnScroll focusPull>
          <p className="mb-4 text-[0.85rem] font-medium text-[var(--sgc-text-muted)]">
            What 90 days of operation looked like, before and after implementation.
          </p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-4 border-b border-[var(--border)] px-6 py-4">
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                >
                  Metric
                </p>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                >
                  Before
                </p>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                >
                  After
                </p>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.metric}
                  className="grid grid-cols-[1.3fr_1fr_1fr] gap-4 border-b border-[rgba(255,255,255,0.06)] px-6 py-4 last:border-none"
                >
                  <p className="text-[0.95rem] text-[var(--sgc-text-primary)]">{row.metric}</p>
                  <p className="text-[0.95rem] text-[var(--sgc-text-muted)]">{row.before}</p>
                  <p className="text-[0.95rem] text-[var(--accent-sage)]">{row.after}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 p-5 md:hidden">
              {comparisonRows.map((row) => (
                <article
                  key={row.metric}
                  className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(8,11,17,0.55)] p-4"
                >
                  <h3
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="text-[1rem] font-semibold text-[var(--sgc-text-primary)]"
                  >
                    {row.metric}
                  </h3>
                  <p className="mt-3 text-[0.92rem] text-[var(--sgc-text-muted)]">Before: {row.before}</p>
                  <p className="mt-2 text-[0.92rem] text-[var(--accent-sage)]">After: {row.after}</p>
                </article>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <LivingCard>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p
              style={{ fontFamily: "var(--font-inter)" }}
              className="text-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-copper)]"
            >
              Typical Growth-tier client · Year 1
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-gold-gradient text-[1.5rem] font-bold"
                >
                  AED 52,000 invested
                </p>
                <p className="mt-2 text-[0.9rem] text-[var(--sgc-text-muted)]">
                  AED 22K implementation + 12 × AED 2,500 subscription
                </p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-gold-gradient text-[1.5rem] font-bold"
                >
                  AED 120K–180K recovered
                </p>
                <p className="mt-2 text-[0.9rem] text-[var(--sgc-text-muted)]">
                  Admin hours, faster cash cycle, recovered leads
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-[0.85rem] font-medium text-[var(--sgc-text-muted)]">
              Payback:{" "}
              <span className="font-semibold text-[var(--sgc-text-primary)]">4–6 months typical</span>.
              Conservative range. Per-client calculation provided in Discovery.
            </p>
          </div>
          </LivingCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}
