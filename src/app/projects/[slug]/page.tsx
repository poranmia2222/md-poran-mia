import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { getProjectBySlug, getProjects } from "@/lib/projects";

/* Dynamic project detail pages — statically generated from the typed data
   module; the homepage stays a single-page portfolio. */

const sectionTitleClass =
  "text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100";

const badgeClass =
  "rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-white/[0.03] dark:text-zinc-300";

const cardClass =
  "rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-[#0a0d0a]/60";

const buttonClass =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-lime-400 px-5 text-sm font-semibold text-[#0a0d0a] transition-all duration-200 hover:bg-lime-300 hover:shadow-md hover:shadow-lime-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400";

const ghostButtonClass =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:border-lime-500/50 hover:text-lime-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-lime-300";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Poran Mia`,
    description: project.overview,
  };
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-0.5 size-4 shrink-0 text-lime-600 dark:text-lime-400"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="animate-rise mx-auto w-full max-w-4xl flex-1 px-4 pt-10 pb-24 sm:px-6">
        {/* Back to portfolio */}
        <nav aria-label="Breadcrumb">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-lime-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:text-zinc-400 dark:hover:text-lime-400"
          >
            <span aria-hidden>←</span> Back to portfolio
          </Link>
        </nav>

        {/* Header */}
        <header className="mt-6">
          <p className="font-mono text-xs font-semibold tracking-widest text-lime-600 uppercase dark:text-lime-400/90">
            {project.name}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tighter text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {project.tagline}
          </h1>

          {/* Cover */}
          <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg shadow-black/[0.08] dark:border-zinc-800 dark:shadow-black/40">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 56rem) 56rem, 100vw"
              priority
              className="w-full object-cover object-top"
            />
          </figure>

          {/* CTAs — live demo + client-side repository */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={buttonClass}
            >
              Live Demo
              <span aria-hidden>↗</span>
              <span className="sr-only"> — opens in a new tab</span>
            </a>
            <a
              href={project.clientRepo}
              target="_blank"
              rel="noreferrer"
              className={ghostButtonClass}
            >
              GitHub Repository
              <span aria-hidden>↗</span>
              <span className="sr-only"> — opens in a new tab</span>
            </a>
          </div>
        </header>

        <div className="mt-16 space-y-16">
          {/* Overview */}
          <section>
            <h2 className={sectionTitleClass}>Overview</h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.overview}
            </p>
          </section>

          {/* Technology stack */}
          <section>
            <h2 className={sectionTitleClass}>Technology Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((label) => (
                <li key={label} className={badgeClass}>
                  {label}
                </li>
              ))}
            </ul>
          </section>

          {/* Key features */}
          <section>
            <h2 className={sectionTitleClass}>Key Features</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.features.map(({ title, items }) => (
                <div key={title} className={cardClass}>
                  <h3 className="text-sm font-bold tracking-wide text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                      >
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Screens from the app (provided assets) */}
          <section>
            <h2 className={sectionTitleClass}>Inside the App</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 40rem) 27.5rem, 100vw"
                    className="h-48 w-full object-cover object-top transition-transform duration-300 hover:scale-[1.03]"
                  />
                  <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-white/[0.03] dark:text-zinc-400">
                    {image.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Challenges & solutions */}
          <section>
            <h2 className={sectionTitleClass}>
              Development Challenges &amp; Solutions
            </h2>
            <div className="mt-4 space-y-4">
              {project.challenges.map(({ challenge, solution }, index) => (
                <div key={challenge} className={cardClass}>
                  <p className="mt-0.5 font-mono text-xs font-semibold text-lime-600 dark:text-lime-400/90">
                    Challenge {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {challenge}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-lime-600 dark:text-lime-400">
                      Solution:{" "}
                    </span>
                    {solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Future improvements */}
          <section>
            <h2 className={sectionTitleClass}>Future Improvements</h2>
            <ul className="mt-4 space-y-2.5">
              {project.future.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom back link */}
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link
            href="/#projects"
            className={ghostButtonClass}
          >
            <span aria-hidden>←</span> Back to all projects
          </Link>
        </div>
      </main>
    </>
  );
}
