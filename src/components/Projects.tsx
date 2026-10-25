import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

/* Featured Projects section — keeps the homepage a single-page portfolio;
   detail lives at /projects/[slug]. */

export default function Projects() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="mx-auto max-w-4xl px-4 py-24 sm:px-6"
    >
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Featured <span className="text-lime-600 dark:text-lime-400">Projects</span>
      </h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A selection of real, deployed applications — open a card for the full
        story: features, challenges, and the code behind them.
      </p>

      {/* Two-up grid on md+, stacked on mobile; entrance stagger via inline delay */}
      <div className="mt-10 grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
