import Link from "next/link";
import type { CSSProperties } from "react";

import { NAV_LINKS } from "@/lib/links";
import { ICONS, type BrandIcon } from "./icons";

/* Footer — a simple, elegant close for the site: brand + one-line tagline,
   tracked socials, quick section links, and a slim bottom bar with copyright
   and a back-to-top link. The hairline borders mirror the navbar; the socials
   reuse the Hero/Contact convention ("#" while the live profile is pending). */

const EMAIL = "poranmia2222@gmail.com"; // same address used in the Contact section

const SOCIALS: { label: string; href: string; icon: BrandIcon }[] = [
  { label: "GitHub", href: "#", icon: ICONS.github },
  { label: "LinkedIn", href: "#", icon: ICONS.linkedin },
  { label: "Email", href: `mailto:${EMAIL}`, icon: ICONS.mail },
];

/* Brand icon with the same light-theme fill handling as the Skills tiles */
function SocialIcon({ icon }: { icon: BrandIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.lightColor ?? icon.color}
      aria-hidden
      className={
        icon.lightColor
          ? "size-[18px] dark:fill-[var(--icon-dark)]"
          : "size-[18px]"
      }
      style={
        icon.lightColor
          ? ({ "--icon-dark": icon.color } as CSSProperties)
          : undefined
      }
    >
      <path d={icon.path} />
    </svg>
  );
}

export default async function Footer() {
  "use cache";

  // Current time is an unstable value during prerender — the cache directive
  // lets the footer prerender and refresh on its own schedule instead.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/[0.06] bg-white/40 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Brand + tagline on the left, socials on the right */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/#home"
              className="flex w-fit items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-lime-600 dark:text-zinc-100 dark:hover:text-lime-400"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-lime-400 font-extrabold text-[#0a0d0a]">
                P
              </span>
              Poran<span className="text-lime-400">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Full-Stack Developer building fast, modern web apps with
              Next.js, React, and TypeScript.
            </p>
          </div>

          {/* Socials — icon chips; "#" profiles keep the subdued pending
              treatment used by the Contact cards, live links get the lift */}
          <ul className="flex items-center gap-2.5">
            {SOCIALS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={
                    href === "#"
                      ? "grid size-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50/80 text-zinc-400 opacity-80 dark:border-zinc-800 dark:bg-white/[0.03] dark:text-zinc-500"
                      : "grid size-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-500/40 hover:text-lime-600 hover:shadow-md hover:shadow-black/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-zinc-800 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-lime-400/40 dark:hover:text-lime-400 dark:hover:shadow-black/40"
                  }
                >
                  <SocialIcon icon={icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick section links — same single source as the navbar */}
        <nav
          aria-label="Footer"
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium"
        >
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`/#${id}`}
              className="text-zinc-600 transition-colors hover:text-lime-600 dark:text-zinc-300 dark:hover:text-lime-400"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Slim bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/5">
          <p>
            © {year}{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Poran Mia
            </span>
            . All rights reserved.
          </p>
          <Link
            href="/#home"
            className="inline-flex w-fit items-center gap-1.5 font-medium transition-colors hover:text-lime-600 dark:hover:text-lime-400"
          >
            Back to top <span aria-hidden>↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
