import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      {/* 4-column trust grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center">
              <Image
                src="/images/diamonds/final-logo-nav.png"
                alt="SGC Tech AI"
                width={783}
                height={212}
                className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(199,162,58,0.3)]"
              />
            </div>
            <p className="mt-4 text-[0.82rem] leading-[1.7] text-[var(--sgc-text-muted)]">
              Practitioner-led finance, compliance &amp; systems implementation.
              Dubai, UAE.
            </p>
            <p className="mt-2 text-[0.75rem] leading-[1.7] text-[rgba(244,241,232,0.4)]">
              Built in Dubai. Serving UAE mid-market. IFZA-Licensed.
            </p>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {[
                  { label: "Problem", href: "#problem" },
                  { label: "Solution", href: "#solution" },
                  { label: "Proof", href: "#case-study" },
                  { label: "Founders", href: "#founder" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.85rem] text-[var(--sgc-text-muted)] transition duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]">
              Legal
            </p>
            <ul className="space-y-2 text-[0.82rem] leading-[1.7] text-[var(--sgc-text-muted)]">
              <li className="font-medium text-[var(--text-primary)]">Scholarix Global Consultant FZE</li>
              <li>UAE Incorporated · Dubai</li>
              <li>Al Rigga Road, Abu Saif Business Center 304</li>
              <li>Union Metro Station</li>
              <li className="pt-1">Data processed per UAE PDPL</li>
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--sgc-text-muted)]">
              Connect
            </p>
            <ul className="space-y-2.5">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/sgctechai",
                },
                {
                  label: "Instagram · @sgctech.ai",
                  href: "https://instagram.com/sgctech.ai",
                },
                {
                  label: "X · @sgctech_ai",
                  href: "https://x.com/sgctech_ai",
                },
                {
                  label: "info@sgctech.ai",
                  href: "mailto:info@sgctech.ai",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="text-[0.85rem] text-[var(--sgc-text-muted)] transition duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-[0.78rem] text-[var(--sgc-text-muted)] md:flex-row md:px-10">
          <p>© 2026 Scholarix Global Consultant FZE (SGC Tech AI) · All prices exclusive of 5% UAE VAT.</p>
          <nav aria-label="Footer legal links" className="flex items-center gap-5">
            <a href="mailto:info@sgctech.ai?subject=Privacy%20Policy%20Request" className="transition duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Privacy</a>
            <a href="mailto:info@sgctech.ai?subject=Terms%20of%20Service%20Request" className="transition duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Terms</a>
            <a href="mailto:info@sgctech.ai?subject=Compliance%20Inquiry" className="transition duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Compliance</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
