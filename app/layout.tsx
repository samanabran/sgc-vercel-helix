import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SGC Tech AI — The Odoo Firm Your CFO Would Have Founded",
  description:
    "UAE-based, finance-credentialed Odoo + AI implementation firm. CPA- and CIA-led. Fixed price, fixed timeline. Serving real estate, construction, and trading mid-market across the UAE.",
  keywords: [
    "Odoo UAE",
    "ERP implementation Dubai",
    "AI finance automation",
    "mid-market ERP",
    "RERA compliance",
    "UAE Corporate Tax",
    "Odoo partner",
    "finance operations audit",
    "SGC Tech AI",
  ],
  authors: [{ name: "SGC Tech AI — Scholarix Global Consultant FZE" }],
  openGraph: {
    title: "SGC Tech AI — The Odoo Firm Your CFO Would Have Founded",
    description:
      "Practitioner-led Odoo + AI implementation for UAE mid-market. CPAs and CIAs who got tired of bad ERP.",
    url: "https://sgctech.ai",
    siteName: "SGC Tech AI",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SGC Tech AI — The Odoo Firm Your CFO Would Have Founded",
    description:
      "Practitioner-led Odoo + AI implementation for UAE mid-market.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top">
      <body
        className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Skip-to-content link — accessibility: keyboard users can jump past nav */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)] focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
