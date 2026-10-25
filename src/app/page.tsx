import Image from "next/image";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Home / Hero */}
        <Hero />

        {/* About */}
        <section
          id="about"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6"
        >
          <h2 className="text-3xl font-bold text-zinc-100">
            About <span className="text-lime-400">Me</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Placeholder for the about section — tell your story here.
          </p>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6"
        >
          <h2 className="text-3xl font-bold text-zinc-100">
            My <span className="text-lime-400">Skills</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Placeholder for the skills section — technologies and tools go here.
          </p>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6"
        >
          <h2 className="text-3xl font-bold text-zinc-100">
            Featured <span className="text-lime-400">Projects</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Placeholder for the projects section — showcase your work here.
          </p>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6"
        >
          <h2 className="text-3xl font-bold text-zinc-100">
            Get In <span className="text-lime-400">Touch</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Placeholder for the contact section — a form or email link goes here.
          </p>
        </section>
      </main>
    </>
  );
}
