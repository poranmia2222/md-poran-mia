import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

/* Polished glass project card — cover image with a slow zoom on hover,
   tech-stack badges, and a primary "View details" route link. */

const badgeClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-white/[0.03] dark:text-zinc-300";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article
      className="group animate-rise flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 shadow-sm shadow-black/[0.03] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-lime-500/40 hover:shadow-xl hover:shadow-black/[0.08] dark:border-zinc-800 dark:bg-[#0a0d0a]/60 dark:shadow-black/20 dark:hover:border-lime-400/40 dark:hover:shadow-black/50"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Cover — gentle zoom on card hover */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details of ${project.name}`}
        className="relative block overflow-hidden border-b border-zinc-200/70 dark:border-zinc-800/70"
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 768px) 44rem, 100vw"
          priority={index === 0}
          className="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] sm:h-64"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[background-image:linear-gradient(to_top,rgba(163,230,53,0.08),transparent_30%)]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        <p className="mt-1 font-mono text-xs font-medium text-lime-600 dark:text-lime-400/90">
          {project.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.overview.split(". ")[0]}.
        </p>

        {/* Tech stack badges */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((label) => (
            <li key={label} className={badgeClass}>
              {label}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-lime-400 px-4 text-sm font-semibold text-[#0a0d0a] transition-all duration-200 hover:bg-lime-300 hover:shadow-md hover:shadow-lime-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            View Details
            <span aria-hidden>→</span>
          </Link>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:border-lime-500/50 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-lime-300"
          >
            Live Demo
            <span className="sr-only"> — opens in a new tab</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
