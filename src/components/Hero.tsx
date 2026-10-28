"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import { ICONS, type BrandIcon } from "./icons";
const RESUME_URL = "/resume.pdf";

// Tech stack — official brand marks (Simple Icons), shared via ./icons
const TECH_STACK: readonly {
  readonly label: string;
  readonly icon: BrandIcon;
}[] = [
  { label: "Next.js", icon: ICONS.next },
  { label: "TypeScript", icon: ICONS.typescript },
  { label: "React", icon: ICONS.react },
  { label: "Tailwind CSS", icon: ICONS.tailwind },
  { label: "Firebase", icon: ICONS.firebase },
  { label: "Node.js", icon: ICONS.node },
  { label: "Express", icon: ICONS.express },
  { label: "MongoDB", icon: ICONS.mongodb },
  { label: "Better Auth", icon: ICONS.betterauth },
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/poranmia2222", icon: ICONS.github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/poranmia/", icon: ICONS.linkedin },
  { label: "Email", href: "mailto:poranmia2222@gmail.com", icon: ICONS.mail },
] as const;


/* Entrance choreography — staggered delays for the hero's rise-in */
const rise = (delay: string) => ({ animationDelay: delay }) as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax: layers with [data-speed] translate with scroll + cursor;
  // the content wrapper ([data-fade]) fades out as you scroll past the hero.
  // Desktop-only choreography: on phones the copy stacks above the portrait,
  // and a scroll-driven fade made the intro vanish before the picture was
  // even in view — so small screens get none of it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-speed]"),
    );
    const faders = Array.from(
      section.querySelectorAll<HTMLElement>("[data-fade]"),
    );

    const mouse = { x: 0, y: 0 };
    let raf = 0;

    const desktop = window.matchMedia("(min-width: 768px)");

    // Undo any inline transforms/opacity so elements fall back to their
    // classes when the choreography is off (phones, or a rotated tablet).
    const reset = () => {
      for (const el of layers) el.style.transform = "";
      for (const el of faders) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    };

    const render = () => {
      raf = 0;
      if (!desktop.matches) {
        reset();
        return;
      }

      const scrollY = window.scrollY;

      for (const el of layers) {
        const speed = Number.parseFloat(el.dataset.speed ?? "0");
        const x = mouse.x * speed * 44;
        const y = scrollY * speed + mouse.y * speed * 32;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      const progress = Math.min(scrollY / 600, 1);
      for (const el of faders) {
        el.style.opacity = String(1 - progress);
        el.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    const onDesktopChange = () => schedule();

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    desktop.addEventListener("change", onDesktopChange);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("mousemove", onMouseMove);
      desktop.removeEventListener("change", onDesktopChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 pb-16"
    >
      {/* Layer 1: dot grid background (slowest) */}
      <div
        aria-hidden
        data-speed="-0.06"
        className="absolute -inset-16 will-change-transform"
      >
        <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(101,163,13,0.14)_1px,transparent_1px)] [background-size:32px_32px] dark:[background-image:radial-gradient(circle,rgba(163,230,53,0.07)_1px,transparent_1px)]" />
      </div>

      {/* Layer 2: glowing lime blobs */}
      <div
        aria-hidden
        data-speed="-0.12"
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-1/4 left-[12%] size-56 rounded-full bg-lime-400/10 blur-3xl sm:size-80" />
        <div className="absolute right-[10%] bottom-1/4 size-64 rounded-full bg-lime-400/[0.07] blur-3xl sm:size-96" />
      </div>

      {/* Layer 3: dual diagonal marquees — two "road lanes" of outline
          text crossing behind the content, streaming opposite ways */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Lane 1 — flows to the right (upper lane, stronger stroke) */}
        <div className="absolute left-1/2 top-[33%] w-[140vw] -translate-x-1/2 -rotate-2">
          <div className="animate-marquee-r flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, k) => (
                  <span
                    key={k}
                    className="pr-10 text-[13vw] font-black tracking-tight whitespace-nowrap text-transparent uppercase select-none [-webkit-text-stroke:1.5px_rgba(101,163,13,0.22)] dark:[-webkit-text-stroke:1.5px_rgba(163,230,53,0.14)]"
                  >
                    Full Stack Developer
                    <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(101,163,13,0.4)] dark:[-webkit-text-stroke:1.5px_rgba(163,230,53,0.3)]">
                      {" "}
                      ✦{" "}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Lane 2 — flows to the left (lower lane, fainter stroke) */}
        <div className="absolute left-1/2 top-[52%] w-[140vw] -translate-x-1/2 rotate-2">
          <div className="animate-marquee-l flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, k) => (
                  <span
                    key={k}
                    className="pr-10 text-[13vw] font-black tracking-tight whitespace-nowrap text-transparent uppercase select-none [-webkit-text-stroke:1.5px_rgba(101,163,13,0.12)] dark:[-webkit-text-stroke:1.5px_rgba(163,230,53,0.08)]"
                  >
                    Full Stack Developer
                    <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(101,163,13,0.32)] dark:[-webkit-text-stroke:1.5px_rgba(163,230,53,0.24)]">
                      {" "}
                      ✦{" "}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground: fades + sinks as you scroll.
          Two-column layout keeps the recruiter scan path (badge → role →
          pitch → resume/contact) fully above the fold; the portrait + orbit
          stack is secondary, on the right. */}
      <div
        data-fade
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-10 will-change-transform md:grid-cols-[1.05fr_auto] md:gap-8 lg:gap-16"
      >
        {/* Left column: everything a recruiter needs, immediately visible */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-lime-800 sm:text-sm dark:text-lime-300"
            style={rise("0.05s")}
          >
            {/* Pulsing "open to work" dot — the first thing recruiters scan for */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-400" />
            </span>
            Open to work — Full-time & freelance
          </p>
          <h1
            className="animate-rise mt-5 text-[2.75rem] font-extrabold leading-[1.05] tracking-tighter text-zinc-900 max-[374px]:text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[4.25rem] dark:text-zinc-50"
            style={rise("0.12s")}
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-br from-lime-600 via-lime-500 to-lime-500 bg-clip-text text-transparent dark:from-lime-200 dark:via-lime-400 dark:to-lime-500">
              Poran Mia
            </span>
            <span className="mt-3 block font-mono text-base font-semibold tracking-normal text-zinc-600 sm:text-lg dark:text-zinc-200">
              Full-Stack Developer · Next.js · React · Node.js
            </span>
          </h1>
          <p
            className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            style={rise("0.2s")}
          >
            I design and build fast, production-ready web apps end to end —
            pixel-perfect UIs, robust REST APIs, and databases that scale.
          </p>

          {/* CTAs — resume download is primary: a recruiter's #1 action */}
          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            style={rise("0.28s")}
          >
            <a
              href={RESUME_URL}
              download="Poran_Mia_Resume.pdf"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 text-sm font-semibold text-[#0a0d0a] shadow-lg shadow-lime-400/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 active:translate-y-0 sm:w-auto"
            >
              Download Resume
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <a
              href="#projects"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-500/50 hover:bg-lime-400/10 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 active:translate-y-0 sm:w-auto dark:border-zinc-700 dark:bg-white/[0.03] dark:text-zinc-200 dark:hover:border-lime-400/40 dark:hover:bg-lime-400/[0.06] dark:hover:text-lime-300"
            >
              View My Work
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-zinc-600 transition-colors duration-200 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:text-zinc-400 dark:hover:text-lime-300"
            >
              Get in Touch
              <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Socials */}
          <div
            className="animate-rise mt-6 flex items-center justify-center gap-3 md:justify-start"
            style={rise("0.36s")}
          >
            <span aria-hidden className="h-px w-10 bg-zinc-700" />
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="grid size-11 place-items-center rounded-xl border border-zinc-200 text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-500/40 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-lime-400/40 dark:hover:text-lime-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-5"
                >
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right column: compact portrait */}
        <div
          className="animate-rise relative justify-self-center"
          style={rise("0.44s")}
        >
          {/* Offset decorative frame behind the card */}
          <div
            aria-hidden
            className="absolute -inset-3 rotate-6 rounded-[2.5rem] border border-lime-400/15 sm:rotate-[8deg]"
          />

          {/* Glow behind portrait (its own parallax layer) */}
          <div
            aria-hidden
            data-speed="0.14"
            className="absolute -inset-8 will-change-transform"
          >
            <div className="animate-aura absolute inset-0 rounded-full bg-lime-400/25 blur-3xl" />
          </div>

          {/* Portrait card — float bob wrapper */}
          <div data-speed="0.08" className="relative will-change-transform">
            <div className="animate-float" style={{ animationDelay: "1.4s" }}>
              <div className="relative aspect-[4/5] w-56 rotate-3 overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-black/25 ring-1 ring-lime-400/25 sm:w-64 md:w-56 lg:w-72 lg:rotate-2 dark:shadow-black/50">
                {/* Plain <img>: serves the raw high-res PNG, no optimizer recompression */}
                <img
                  src="/MyImage.png"
                  alt="Portrait of Poran Mia"
                  width={1448}
                  height={1086}
                  loading="eager"
                  decoding="async"
                  className="animate-breathe absolute inset-0 h-full w-full object-cover object-[center_30%]"
                />
                {/* Glass name plate — labels the portrait without clutter */}
                <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0a0d0a]/80 px-3.5 py-2.5 backdrop-blur-md">
                  <p className="text-[13px] font-bold text-zinc-50">
                    Poran Mia
                  </p>
                  <p className="text-[11px] font-medium text-lime-300">
                    Full-Stack Dev
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills ticker — marquee strip pinned to the hero's bottom edge */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-zinc-200 bg-white/70 py-3 backdrop-blur dark:border-zinc-800/80 dark:bg-[#0a0d0a]/70">
        <p className="sr-only">Technologies I work with</p>
        <div className="animate-marquee-l flex w-max hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {/* 3 copies per half keep the half wider than any viewport —
                  the -50% translate then loops with no blank gap */}
              {Array.from({ length: 3 }).map((_, copy) =>
                TECH_STACK.map(({ label, icon }) => (
                  <span
                    key={`${copy}-${label}`}
                    className="mx-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={icon.lightColor ?? icon.color}
                      aria-hidden
                      style={
                        icon.lightColor
                          ? ({ "--icon-dark": icon.color } as CSSProperties)
                          : undefined
                      }
                      className={
                        icon.lightColor
                          ? "size-4 dark:fill-[var(--icon-dark)]"
                          : "size-4"
                      }
                    >
                      <path d={icon.path} />
                    </svg>
                    {label}
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
        {/* Soft edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0a0d0a]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0a0d0a]"
        />
      </div>

      {/* Scroll hint — desktop/tablet only; on phones the stacked layout makes
          the full-height scroll obvious, and this would overlap the portrait */}
      <div
        aria-hidden
        data-fade
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-zinc-300 p-1.5 dark:border-zinc-600">
          <span className="animate-float size-1 rounded-full bg-lime-400" />
        </span>
      </div>
    </section>
  );
}
