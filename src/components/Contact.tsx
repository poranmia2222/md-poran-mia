import { ICONS, type BrandIcon } from "./icons";
import type { CSSProperties } from "react";

/* Contact section — live links only: GitHub/LinkedIn profiles, the direct
   email row, and the résumé download. External profiles open in a new tab,
   matching the hero's socials and the project pages. */

const EMAIL = "poranmia2222@gmail.com";

const RESUME_URL = "/resume.pdf";

const pitch =
  "Open to full-time roles and freelance projects. If you have a question, an idea, or an opportunity, my inbox and profiles below are the fastest way to reach me.";

type Connection = {
  label: string;
  href: string;
  description: string;
  icon?: BrandIcon;
  /** Renders a download hint badge instead of the external-link arrow */
  download?: boolean;
};

const CONNECTIONS: Connection[] = [
  {
    label: "GitHub",
    href: "https://github.com/poranmia2222",
    description: "Code, experiments, and open source",
    icon: ICONS.github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/poranmia/",
    description: "Professional profile and networking",
    icon: ICONS.linkedin,
  },
  {
    label: "Download Resume",
    href: RESUME_URL,
    description: "PDF résumé, ready to go",
    download: true,
  },
];

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-6 text-lime-600 dark:text-lime-400"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

/* Icon with the same light-theme fill handling as the Skills tiles */
function ConnectionIcon({ icon }: { icon: BrandIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.lightColor ?? icon.color}
      aria-hidden
      className={
        icon.lightColor
          ? "size-6 dark:fill-[var(--icon-dark)]"
          : "size-6"
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

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Get In <span className="text-lime-600 dark:text-lime-400">Touch</span>
      </h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{pitch}</p>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Pitch card */}
        <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur sm:p-8 dark:border-zinc-800 dark:bg-[#0a0d0a]/60">
          <p className="font-mono text-xs font-semibold tracking-widest text-lime-600 uppercase dark:text-lime-400/90">
            Available for work
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50">
            Let&apos;s build something together.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {EMAIL
              ? "The quickest path is a direct email — I usually reply within a day."
              : "The quickest path is one of the profiles on the right."}
          </p>

          {/* Email CTA — appears automatically when EMAIL is filled in */}
          {EMAIL && (
            <a
              href={`mailto:${EMAIL}`}
              className="mt-auto inline-flex h-11 w-fit items-center gap-2 self-start rounded-xl bg-lime-400 px-5 text-sm font-semibold text-[#0a0d0a] transition-all duration-200 hover:bg-lime-300 hover:shadow-md hover:shadow-lime-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              Say Hello
              <span aria-hidden>→</span>
            </a>
          )}
          {EMAIL && (
            <p className="mt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {EMAIL}
            </p>
          )}
        </div>

        {/* Direct connections */}
        <ul className="flex flex-col gap-3">
          {CONNECTIONS.map(({ label, href, description, icon, download }) => {
            const inner = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors duration-200 dark:border-zinc-800 dark:bg-white/3 dark:text-zinc-400">
                  {icon ? (
                    <ConnectionIcon icon={icon} />
                  ) : (
                    <DocumentIcon />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-zinc-900 dark:text-zinc-100">
                    {label}
                  </span>
                  <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {description}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="ml-auto font-mono text-sm text-zinc-400"
                >
                  {download ? "↓" : "↗"}
                </span>
              </>
            );

            const live =
              "group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-4 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-500/40 hover:shadow-md hover:shadow-black/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-zinc-800 dark:bg-[#0a0d0a]/60 dark:hover:border-lime-400/40 dark:hover:shadow-black/40";

            return (
              <li key={label}>
                <a
                  href={href}
                  {...(download ? { download: "Poran_Mia_Resume.pdf" } : {})}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={live}
                >
                  {inner}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
