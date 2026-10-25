"use client";

import { useSyncExternalStore } from "react";

/* Sun/moon theme switcher. The inline pre-paint script in layout.tsx owns the
   initial .dark class; this component toggles it and persists the choice.
   State comes from a MutationObserver on <html class>, so the icon reflects
   the real theme (including script-driven changes) with no hydration guesswork. */
const themeStore = {
  subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  },
  getSnapshot() {
    return document.documentElement.classList.contains("dark");
  },
};

export default function ThemeToggle() {
  // Server + first hydration render assume dark (the SSR default).
  const isDark = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, () => true);

  const toggle = () => {
    document.documentElement.classList.toggle("dark", !isDark);
    try {
      localStorage.setItem("theme", isDark ? "light" : "dark");
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-9 place-items-center rounded-lg text-zinc-600 transition-colors duration-200 hover:bg-black/5 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-lime-400"
    >
      {/* Sun shows while dark (click = light); moon shows while light */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-5"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
