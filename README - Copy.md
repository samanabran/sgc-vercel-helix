# SGC Tech AI — Website

Premium marketing site for SGC Tech AI, a UAE-based, finance-credentialed Odoo + AI implementation firm.

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router) + React 19.2.6 + TypeScript 6.x
- **Styling**: Tailwind CSS 3.4.17 with gold (#C7A23A) / warm-black (#0B0F14) palette
- **Animation**: Motion (Framer Motion) + GSAP + ScrollTrigger + Lenis smooth scroll
- **3D**: React Three Fiber + Drei (DNA helix, 8 diamonds, particle system)
- **Package Manager**: Bun

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun run start
```

## Deploy to Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the repository in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Next.js — no special configuration needed
4. Set **Framework Preset**: Next.js
5. Set **Build Command**: `bun run build`
6. Set **Install Command**: `bun install`
7. Deploy

Alternatively, deploy directly from CLI:

```bash
npx vercel --prod
```

## Project Structure

```
sgc-site/
├── app/
│   ├── layout.tsx          # Root layout (fonts, SEO, skip-to-content)
│   ├── page.tsx            # Home page composition
│   └── globals.css         # Global styles
├── components/
│   ├── HelixSpiral/        # 3D scene (Scene, DNAHelix, DiamondRing, CinematicCaption)
│   ├── Hero/               # StaticHero, DiamondScrollHero, ReducedMotionFallback
│   ├── sections/           # ProblemSection, SolutionSection, CaseStudySection, etc.
│   ├── ui/                 # RevealOnScroll, LivingCard, GoldDrawIn, SheenLayer, etc.
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── AudioToggle.tsx
│   └── LenisProvider.tsx
├── hooks/                  # useExperienceStoreImpl
├── lib/                    # Audio players (scrubPlayer, cinematicSynth), lenis config
├── styles/                 # hero.css (design tokens)
├── public/
│   ├── images/             # Logos, diamonds, founder photos
│   ├── bg-music/           # Background audio
│   └── videos/video-frames/# Flipbook frames for ReducedMotionFallback
└── tailwind.config.js
```

## Design Tokens

All tokens are defined in `styles/hero.css` under `:root`. Key tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | #080B11 | Page background (vault ink) |
| `--accent` | #C7A23A | Primary gold accent |
| `--text-primary` | #F4F1E8 | Warm ivory body text |
| `--text-muted` | rgba(244,241,232,0.6) | Secondary text |
| `--font-fraunces` | Fraunces | Headings |
| `--font-inter` | Inter | Body text |
| `--font-mono` | JetBrains Mono | Credentials, tags |

## License

© 2026 Scholarix Global Consultant FZE (SGC Tech AI)
