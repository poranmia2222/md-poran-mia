/* Education — academic history as modern cards. Visual language matches the
   Skills tiles: flat surface, 1px hairline border, lime-tinted icon chip, and
   a subtle hover glow — pulled from the same design system, no card library. */

type EducationEntry = {
  degree: string;
  institution: string;
  /** Graduation year */
  year: number;
};

/* Education history — newest first. */
const EDUCATION: EducationEntry[] = [
  {
    degree: "Bachelor's Degree in Chemistry",
    institution: "National University, Bangladesh",
    year: 2024,
  },
];

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        My <span className="text-lime-600 dark:text-lime-400">Education</span>
      </h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        My academic background.
      </p>

      <div className="mt-10 space-y-5">
        {EDUCATION.map(({ degree, institution, year }) => (
          <div
            key={degree}
            className="group relative flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition-all duration-200 hover:border-lime-500/40 hover:bg-lime-400/[0.04] hover:shadow-[0_0_24px_-8px_rgba(101,163,13,0.35)] sm:gap-6 sm:p-8 dark:border-zinc-800 dark:bg-[#0a0d0a]/60 dark:hover:border-lime-400/40 dark:hover:bg-lime-400/[0.03] dark:hover:shadow-[0_0_24px_-8px_rgba(163,230,53,0.35)]"
          >
            {/* Graduation-cap chip */}
            <div className="grid size-14 shrink-0 place-items-center rounded-xl border border-lime-600/20 bg-lime-400/10 transition-transform duration-200 group-hover:scale-105 sm:size-16 dark:border-lime-400/20 dark:bg-lime-400/[0.06]">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-7 text-lime-600 sm:size-8 dark:text-lime-400"
              >
                {/* Heroicons "academic-cap" (solid), Heroicons v2 */}
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>
            </div>

            {/* Degree + university */}
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-lime-700 sm:text-xl dark:text-zinc-100 dark:group-hover:text-lime-300">
                {degree}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
                {institution}
              </p>
              {/* Graduation year stays inline on small screens */}
              <p className="mt-2 font-mono text-sm font-semibold text-lime-600 sm:hidden dark:text-lime-400">
                Graduated {year}
              </p>
            </div>

            {/* Graduation-year badge on larger screens */}
            <span className="hidden shrink-0 rounded-full border border-lime-600/20 bg-lime-400/10 px-4 py-1.5 font-mono text-sm font-semibold text-lime-600 sm:block dark:border-lime-400/20 dark:bg-lime-400/[0.06] dark:text-lime-400">
              Graduated {year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
