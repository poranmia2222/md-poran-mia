"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { NAV_LINKS } from "@/lib/links";

const RESUME_URL = "/resume.pdf";

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const probe = window.scrollY + 160; // navbar height + breathing room
      let current: string = NAV_LINKS[0].id;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      // At the very bottom, always activate the last section.
      const atBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].id;

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (id: string) =>
    `relative transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-lime-400 after:transition-all after:duration-200 ${
      activeId === id
        ? "text-lime-600 after:w-full dark:text-lime-400"
        : "text-zinc-600 hover:text-lime-600 after:w-0 hover:after:w-full dark:text-zinc-300 dark:hover:text-lime-400"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur-md transition-shadow duration-300 dark:border-white/5 dark:bg-[#0a0d0a]/80 ${
        scrolled ? "shadow-lg shadow-black/[0.05] dark:shadow-black/40" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-lime-600 dark:text-zinc-100 dark:hover:text-lime-400"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-lime-400 font-extrabold text-[#0a0d0a]">
            P
          </span>
          Poran<span className="text-lime-400">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a href={`/#${id}`} className={linkClass(id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle + resume + hamburger group */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <a
              href={RESUME_URL}
              download="Poran_Mia_Resume.pdf"
              className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-[#0a0d0a] shadow-sm shadow-lime-400/30 transition-all duration-200 hover:bg-lime-300 hover:shadow-md hover:shadow-lime-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-lg text-zinc-700 transition-colors hover:bg-black/5 md:hidden dark:text-zinc-200 dark:hover:bg-white/5"
          >
          <span
            className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              menuOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-in-out md:hidden dark:border-white/5 dark:bg-[#0a0d0a]/95 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4 text-sm font-medium">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 transition-colors ${
                  activeId === id
                    ? "bg-lime-400/10 text-lime-400"
                    : "text-zinc-700 hover:bg-black/5 hover:text-lime-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-lime-400"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={RESUME_URL}
              download="Poran_Mia_Resume.pdf"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg bg-lime-400 px-3 py-2.5 text-center font-semibold text-[#0a0d0a] transition-colors hover:bg-lime-300"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
