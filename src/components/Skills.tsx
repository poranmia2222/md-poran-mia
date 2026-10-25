import { ICONS, type BrandIcon } from "./icons";
import type { CSSProperties } from "react";

/* Square-tile skills grid — visual language borrowed from shadcn/ui cards and
   HeroUI chips (flat surface, 1px hairline border, subtle hover elevation)
   without pulling in either library. */

type Skill = { label: string; icon: BrandIcon };
type SkillSection = {
  title: string;
  /** Tailwind column classes for the tile grid inside this card */
  tiles: string;
  /** Grid-card placement on the outer grid */
  span: string;
  items: Skill[];
};

/* Five skill groups as provided by the author. The 8-item Frontend card spans
   a double column and shows 4-wide tile rows; smaller groups stay 2-wide. */
const SECTIONS: SkillSection[] = [
  {
    title: "Frontend Development",
    tiles: "grid-cols-2 sm:grid-cols-4",
    span: "sm:col-span-2 lg:col-span-2",
    items: [
      { label: "HTML5", icon: ICONS.html5 },
      { label: "CSS3", icon: ICONS.css3 },
      { label: "JavaScript", icon: ICONS.javascript },
      { label: "TypeScript", icon: ICONS.typescript },
      { label: "React.js", icon: ICONS.react },
      { label: "Next.js", icon: ICONS.next },
      { label: "Tailwind CSS", icon: ICONS.tailwind },
      { label: "DaisyUI", icon: ICONS.daisyui },
      { label: "shadcn/ui", icon: ICONS.shadcn },
      { label: "HeroUI", icon: ICONS.heroui },
    ],
  },
  {
    title: "Backend Development",
    tiles: "grid-cols-2",
    span: "lg:col-span-1",
    items: [
      { label: "Node.js", icon: ICONS.node },
      { label: "Express.js", icon: ICONS.express },
      { label: "REST APIs", icon: ICONS.api },
      { label: "Better Auth", icon: ICONS.betterauth },
    ],
  },
  {
    title: "Database",
    tiles: "grid-cols-2",
    span: "lg:col-span-1",
    items: [
      { label: "MongoDB", icon: ICONS.mongodb },
      { label: "Firebase", icon: ICONS.firebase },
    ],
  },
  {
    title: "Tools & Platforms",
    tiles: "grid-cols-2",
    span: "lg:col-span-1",
    items: [
      { label: "Git", icon: ICONS.git },
      { label: "GitHub", icon: ICONS.github },
      { label: "VS Code", icon: ICONS.vscode },
      { label: "Vercel", icon: ICONS.vercel },
      { label: "Netlify", icon: ICONS.netlify },
      { label: "Postman", icon: ICONS.postman },
    ],
  },
  {
    title: "Graphic Design",
    tiles: "grid-cols-2",
    span: "lg:col-span-1",
    items: [
      { label: "Adobe Photoshop", icon: ICONS.adobephotoshop },
      { label: "Adobe Illustrator", icon: ICONS.adobeillustrator },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        My <span className="text-lime-600 dark:text-lime-400">Skills</span>
      </h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The tools and technologies I use to design, build, and ship web
        applications.
      </p>

      <div className="mt-10 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ title, tiles, span, items }) => (
          <div
            key={title}
            className={`rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur sm:p-6 dark:border-zinc-800 dark:bg-[#0a0d0a]/60 ${span}`}
          >
            {/* Category header — title left, live count in mono right */}
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-bold tracking-wide text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
              <span className="font-mono text-xs text-lime-600 dark:text-lime-400/70">
                {items.length}
              </span>
            </div>

            {/* Square tiles — icon on top, label below, equal widths */}
            <ul className={`mt-5 grid gap-2.5 ${tiles}`}>
              {items.map(({ label, icon }) => (
                <li
                  key={label}
                  className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-center transition-all duration-200 hover:border-lime-500/40 hover:bg-lime-400/[0.06] hover:shadow-[0_0_24px_-8px_rgba(101,163,13,0.35)] dark:border-zinc-800 dark:bg-white/[0.02] dark:hover:border-lime-400/40 dark:hover:bg-lime-400/[0.05] dark:hover:shadow-[0_0_24px_-8px_rgba(163,230,53,0.35)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={icon.lightColor ?? icon.color}
                    aria-hidden
                    className={
                      icon.lightColor
                        ? "size-7 transition-transform duration-200 group-hover:scale-110 dark:fill-[var(--icon-dark)]"
                        : "size-7 transition-transform duration-200 group-hover:scale-110"
                    }
                    style={
                      icon.lightColor
                        ? ({ "--icon-dark": icon.color } as CSSProperties)
                        : undefined
                    }
                  >
                    <path d={icon.path} />
                  </svg>
                  <span className="text-[11px] leading-tight font-medium text-zinc-600 transition-colors duration-200 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
