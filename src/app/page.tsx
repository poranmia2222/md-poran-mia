import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

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
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            About <span className="text-lime-600 dark:text-lime-400">Me</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12">
            {/* Story */}
            <div className="space-y-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p className="text-lg text-zinc-800 dark:text-zinc-300">
                Hi, I&apos;m{" "}
                <span className="font-semibold text-lime-600 dark:text-lime-400">Poran Mia</span>, a
                Full Stack Developer passionate about building modern,
                user-friendly web applications.
              </p>
              <p>
                My journey began in graphic design in 2018, developing my
                creativity and eye for detail. In 2025, I started my web
                development journey, combining design and technology to turn
                ideas into reality.
              </p>
              <p>
                I&apos;m currently learning and building projects with the MERN
                stack, TypeScript, and Next.js, focusing on responsive
                interfaces and practical solutions.
              </p>
              <p>
                Beyond coding, I enjoy anime, cricket, and traveling to
                peaceful places surrounded by nature. My goal is to keep
                learning and create meaningful digital experiences.
              </p>
            </div>

            {/* Quick facts */}
            <aside className="h-fit rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur sm:p-7 dark:border-zinc-800 dark:bg-[#0a0d0a]/60">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  Journey
                </h3>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="font-mono font-semibold text-lime-600 dark:text-lime-400">
                    2018
                  </span>{" "}
                  — Graphic design,{" "}
                  <span className="font-mono font-semibold text-lime-600 dark:text-lime-400">
                    2025
                  </span>{" "}
                  — into web development
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  Currently learning &amp; building
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {["MERN stack", "TypeScript", "Next.js"].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-white/[0.03] dark:text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  Beyond the code
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {["Anime", "Cricket", "Travel"].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-white/[0.03] dark:text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Skills */}
        <Skills />

        {/* Projects */}
        <Projects />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}
