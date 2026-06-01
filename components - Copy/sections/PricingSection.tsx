"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldDrawIn from "@/components/ui/GoldDrawIn";
import LivingCard from "@/components/ui/LivingCard";

/* ── Featured narrative: the Growth-tier client story ── */
const featuredScenario = {
  title: "A mid-size UAE brokerage with 25 users",
  timeline: [
    { period: "Month 1–2", event: "Discovery → Configuration → UAT", amount: "AED 22,000" },
    { period: "Month 2", event: "Go-live, hypercare begins", amount: null },
    { period: "Month 3–12", event: "Platform Subscription", amount: "AED 2,500/mo" },
    { period: "Month 3–12", event: "Silver Retainer", amount: "AED 9,000/mo" },
  ],
  year1Investment: "AED 160,000",
  year2Recurring: "AED 138,000",
  outcomes: [
    "Commission calculations same-day instead of 4–7 days",
    "RERA reports generated in minutes",
    "AI-extracted leads flowing into Odoo automatically",
    "Quarterly compliance updates, automatic",
    "One named senior consultant who knows your business",
  ],
};

/* ── Comparison tiers for the collapsed section ── */
const allTiers = [
  {
    name: "Starter",
    impl: "AED 15,000",
    monthly: "AED 1,500/mo",
    users: "≤ 10 users",
    timeline: "2–3 weeks",
    modules: "5–8 core Odoo modules",
    aiTasks: "5K AI tasks/month",
    payback: "6–9 mo",
  },
  {
    name: "Growth",
    impl: "AED 22,000",
    monthly: "AED 2,500/mo",
    users: "≤ 25 users",
    timeline: "4–6 weeks",
    modules: "12–18 modules + integrations",
    aiTasks: "15K AI tasks/month",
    payback: "4–6 mo",
    featured: true,
  },
  {
    name: "Professional",
    impl: "AED 40,000",
    monthly: "AED 4,500/mo",
    users: "≤ 75 users",
    timeline: "6–10 weeks",
    modules: "20+ modules + custom extensions",
    aiTasks: "50K AI tasks/month",
    payback: "3–5 mo",
  },
  {
    name: "Enterprise",
    impl: "From AED 75,000",
    monthly: "From AED 7,500/mo",
    users: "Unlimited users",
    timeline: "10–16 weeks",
    modules: "Custom architecture",
    aiTasks: "Custom AI caps",
    payback: "Custom",
  },
];

/* ── Retainer tiers ── */
const retainerTiers = [
  { name: "Bronze", amount: "AED 5,000/mo", hours: "8 hrs", note: "Occasional changes" },
  { name: "Silver", amount: "AED 9,000/mo", hours: "16 hrs", note: "Most growing clients", featured: true },
  { name: "Gold", amount: "AED 15,000/mo", hours: "30 hrs", note: "Continuous evolution" },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 bg-[var(--sgc-gradient-bg)] py-24 md:py-32 lg:py-40"
    >
      <GoldDrawIn />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* ── Section header ── */}
        <RevealOnScroll>
          <SectionEyebrow label="INVESTMENT" />
          <h2
            id="pricing-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] text-[var(--sgc-text-primary)]"
          >
            What your year one looks like.
          </h2>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="mt-5 max-w-[42rem] text-[clamp(1.05rem,1.4vw,1.35rem)] font-medium leading-[1.5] text-[var(--sgc-text-muted)]"
          >
            Not a pricing page. A timeline of what actually happens when you work with us — and what it costs at each stage. The Growth tier fits ~70% of UAE mid-market clients.
          </p>
        </RevealOnScroll>

        {/* ── Featured narrative scenario ── */}
        <RevealOnScroll delay={0.1} focusPull>
          <LivingCard>
            <div className="rounded-2xl border border-[var(--accent)] bg-[var(--surface)] p-8 md:p-10 shadow-[0_0_30px_rgba(199,162,58,0.15)]">
              {/* Scenario title */}
              <p
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-copper)]"
              >
                Featured Scenario · Growth Tier
              </p>
              <h3
                style={{ fontFamily: "var(--font-fraunces)" }}
                className="mt-3 text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold leading-[1.25] text-[var(--sgc-text-primary)]"
              >
                {featuredScenario.title}
              </h3>

              {/* Timeline narrative */}
              <div className="mt-8 space-y-4">
                {featuredScenario.timeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full border border-[var(--accent)] bg-[var(--surface)]" />
                      {i < featuredScenario.timeline.length - 1 && (
                        <div className="h-8 w-px bg-[rgba(199,162,58,0.2)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]"
                      >
                        {step.period}
                      </p>
                      <p className="mt-0.5 text-[0.95rem] text-[var(--sgc-text-primary)]">
                        {step.event}
                      </p>
                      {step.amount && (
                        <p
                          style={{ fontFamily: "var(--font-inter)" }}
                          className="mt-0.5 text-gold-gradient text-[1rem] font-bold"
                        >
                          {step.amount}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Year totals */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-high)] p-5">
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]"
                  >
                    Year 1 Investment
                  </p>
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="mt-2 text-gold-gradient text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold"
                  >
                    {featuredScenario.year1Investment}
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-high)] p-5">
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]"
                  >
                    Year 2+ Recurring
                  </p>
                  <p
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="mt-2 text-gold-gradient text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold"
                  >
                    {featuredScenario.year2Recurring}
                  </p>
                </div>
              </div>

              {/* What this looks like in practice */}
              <div className="mt-8 rounded-xl border border-[rgba(62,150,179,0.25)] bg-[rgba(62,150,179,0.05)] p-6">
                <p
                  style={{ fontFamily: "var(--font-inter)" }}
                  className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-teal)]"
                >
                  What this looks like in practice
                </p>
                <ul className="mt-4 space-y-3">
                  {featuredScenario.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-[var(--accent-sage)] text-[0.9rem]">✓</span>
                      <span className="text-[0.92rem] text-[var(--sgc-text-primary)]">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-[0.82rem] text-[var(--sgc-text-muted)]">
                Payback: <span className="font-semibold text-[var(--sgc-text-primary)]">4–6 months typical</span>.
                Conservative range. Per-client calculation provided in Discovery. All prices in AED, exclusive of 5% VAT.
              </p>
            </div>
          </LivingCard>
        </RevealOnScroll>

        {/* ── Compare all tiers (collapsible) ── */}
        <RevealOnScroll delay={0.2}>
          <details className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <summary
              style={{ fontFamily: "var(--font-inter)" }}
              className="cursor-pointer select-none px-6 py-4 text-[0.9rem] font-semibold text-[var(--sgc-text-muted)] transition duration-200 hover:text-[var(--sgc-text-primary)]"
            >
              Compare all tiers →
            </summary>
            <div className="border-t border-[var(--border)] px-6 pb-6 pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.06)]">
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="pb-3 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]"
                      >
                        Tier
                      </th>
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="pb-3 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]"
                      >
                        Implementation
                      </th>
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="pb-3 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]"
                      >
                        Subscription
                      </th>
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="hidden pb-3 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)] md:table-cell"
                      >
                        Users
                      </th>
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="hidden pb-3 pr-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)] md:table-cell"
                      >
                        Timeline
                      </th>
                      <th
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="hidden pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)] lg:table-cell"
                      >
                        Payback
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTiers.map((tier) => (
                      <tr
                        key={tier.name}
                        className={`border-b border-[rgba(255,255,255,0.04)] ${
                          tier.featured ? "bg-[rgba(199,162,58,0.04)]" : ""
                        }`}
                      >
                        <td className="py-3 pr-4">
                          <span
                            style={{ fontFamily: "var(--font-inter)" }}
                            className="text-[0.92rem] font-semibold text-[var(--sgc-text-primary)]"
                          >
                            {tier.name}
                            {tier.featured && (
                              <span className="ml-2 text-[var(--accent-copper)]">★</span>
                            )}
                          </span>
                        </td>
                        <td
                          style={{ fontFamily: "var(--font-inter)" }}
                          className="py-3 pr-4 text-[0.9rem] font-bold text-[var(--sgc-text-primary)]"
                        >
                          {tier.impl}
                        </td>
                        <td
                          style={{ fontFamily: "var(--font-inter)" }}
                          className="py-3 pr-4 text-[0.9rem] font-bold text-[var(--sgc-text-primary)]"
                        >
                          {tier.monthly}
                        </td>
                        <td className="hidden py-3 pr-4 text-[0.88rem] text-[var(--sgc-text-muted)] md:table-cell">
                          {tier.users}
                        </td>
                        <td className="hidden py-3 pr-4 text-[0.88rem] text-[var(--sgc-text-muted)] md:table-cell">
                          {tier.timeline}
                        </td>
                        <td className="hidden py-3 text-[0.88rem] font-medium text-[var(--accent-teal)] lg:table-cell">
                          {tier.payback}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-center text-[0.78rem] text-[var(--sgc-text-muted)]">
                All prices in AED, exclusive of 5% UAE VAT. Implementation + Subscription always paired.
              </p>
            </div>
          </details>
        </RevealOnScroll>

        {/* ── Optional Operations Retainer ── */}
        <RevealOnScroll delay={0.3}>
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3
              style={{ fontFamily: "var(--font-fraunces)" }}
              className="text-[1rem] font-semibold text-[var(--sgc-text-primary)]"
            >
              Optional Operations Retainer
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {retainerTiers.map((tier, i) => (
                <RevealOnScroll key={tier.name} delay={i * 0.1}>
                  <LivingCard>
                    <div
                      className={`rounded-xl border p-4 transition duration-300 ease-out hover:-translate-y-[3px] hover:border-[rgba(199,162,58,0.35)] hover:shadow-[0_8px_32px_rgba(199,162,58,0.1)] ${
                        tier.featured
                          ? "border-[rgba(199,162,58,0.4)] bg-[rgba(199,162,58,0.04)]"
                          : "border-[var(--border)] bg-[var(--surface-high)]"
                      }`}
                    >
                      <p
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="text-[1rem] font-semibold text-[var(--sgc-text-primary)]"
                      >
                        {tier.name}
                        {tier.featured ? (
                          <span className="ml-2 text-[var(--accent-copper)]">★</span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-[0.9rem] text-[var(--sgc-text-primary)]">
                        {tier.amount}
                      </p>
                      <p className="mt-1 text-[0.86rem] text-[var(--sgc-text-muted)]">
                        {tier.hours}
                      </p>
                      <p className="mt-1 text-[0.86rem] text-[var(--sgc-text-muted)]">
                        {tier.note}
                      </p>
                    </div>
                  </LivingCard>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.35}>
              <p className="mt-5 text-center text-[0.8rem] text-[var(--sgc-text-muted)]">
                6-month minimum. All prices exclusive of 5% UAE VAT.
              </p>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
