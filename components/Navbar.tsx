"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed left-0 top-0 z-50 h-20 w-full px-6 md:px-10 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(8,11,17,0.72)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between">
        <a
          href="#top"
          aria-label="SGC Tech AI - back to top"
          className="group inline-flex items-center gap-[10px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Image
            src="/images/diamonds/final-logo-nav.png"
            alt="SGC Tech AI"
            width={783}
            height={212}
            priority
            className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(199,162,58,0.35)] transition duration-300 group-hover:drop-shadow-[0_0_18px_rgba(199,162,58,0.55)] sm:h-11 lg:h-14"
          />
        </a>

        <div className="flex items-center justify-end gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-4 py-2 text-[13px] font-bold text-[var(--bg)] transition duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(199,162,58,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:px-6 md:py-3"
            aria-label="Book Discovery Call"
          >
            <span className="hidden md:inline">Book Discovery Call →</span>
            <ArrowRight className="md:hidden" size={16} />
          </a>
        </div>
      </div>

      {/* Gold hairline — draws in left-to-right when user scrolls past threshold */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--accent)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled && !reduced ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </nav>
  );
}
