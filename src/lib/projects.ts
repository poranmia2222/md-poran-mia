/* Typed project data — the single source of truth for the Projects section
   and /projects/[slug] detail pages. Content mirrors each project's own
   README/repository; nothing is invented. */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Challenge = {
  challenge: string;
  solution: string;
};

export type FeatureGroup = {
  title: string;
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  tech: string[];
  features: FeatureGroup[];
  /** Derived strictly from what the repository actually implements */
  challenges: Challenge[];
  /** Conservative extensions of features the app already has */
  future: string[];
  demo: string;
  /** Client-side (browser) source repository */
  clientRepo: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "fitlog",
    name: "FitLog",
    tagline: "Your personal workout & exercise tracking companion",
    overview:
      "FitLog is a modern and responsive fitness web application built with Next.js, React, and TypeScript. It lets users explore a collection of exercises, view detailed exercise information, build a personalized daily workout plan, save exercises for later, and manage their workout progress — all persisted in the browser.",
    cover: {
      src: "/project-1/cover.png",
      alt: "FitLog homepage cover",
      width: 1888,
      height: 906,
    },
    gallery: [
      {
        src: "/project-1/insidepage.png",
        alt: "Inside the FitLog app",
        width: 1294,
        height: 1123,
      },
      {
        src: "/project-1/savepage.png",
        alt: "FitLog saved exercises page",
        width: 1280,
        height: 766,
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React Icons",
      "React Toastify",
      "React Context API",
      "LocalStorage",
      "Vercel",
    ],
    features: [
      {
        title: "Exercise library",
        items: [
          "Explore a collection of exercises with detailed information",
          "Muscle groups, equipment, and difficulty level",
          "Duration, calories burned, sets & reps",
          "Star rating and per-exercise description",
        ],
      },
      {
        title: "Today's workout plan",
        items: [
          "Create and manage a personalized workout plan for the day",
          "Maximum of 5 exercises per plan",
          "Prevents duplicate exercises in the plan",
          "Remove exercises or mark them as completed",
        ],
      },
      {
        title: "Save exercises",
        items: [
          "Save exercises from the library to use later",
          "Prevents duplicate saved exercises",
          "Remove saved exercises anytime",
          "Managed separately from today's workout plan",
        ],
      },
      {
        title: "Persistent data & modern UI",
        items: [
          "Workout plans persist in LocalStorage and survive a refresh",
          "Mobile- and desktop-responsive dark-themed interface",
          "Toast notifications for every plan action",
          "Reusable React components throughout",
        ],
      },
    ],
    challenges: [
      {
        challenge:
          "Today's plan and the saved list had to stay consistent across pages, while enforcing rules like the 5-exercise cap and no duplicates.",
        solution:
          "A single ExercisesContext (React Context API) owns both lists behind one API — every add, save, remove, and complete action is validated centrally, and React Toastify tells the user why an action was blocked.",
      },
      {
        challenge:
          "Workout state would be lost every time the browser refreshed.",
        solution:
          "The context rehydrates from LocalStorage on mount and writes back on each change, so plans and saved exercises survive reloads without any backend.",
      },
      {
        challenge:
          "Exercise records carry many optional fields (difficulty, calories, sets & reps, rating, description) that must stay consistent across components.",
        solution:
          "A dedicated types/exercise.type.ts module defines one typed shape used everywhere, catching missing or malformed fields at compile time.",
      },
    ],
    future: [
      "Backend accounts so plans sync across devices",
      "Progress history and stats over time",
      "Search and filtering inside the exercise library",
      "Shareable workout plans",
    ],
    demo: "https://fitlog-a6-eight.vercel.app/",
    clientRepo: "https://github.com/poranmia2222/fitlog-a6",
  },
  {
    slug: "bazardor",
    name: "BazarDor",
    tagline: "Smart shopping starts with the right price",
    overview:
      "বাজার দর (BazarDor) is a Bengali-first market price tracking platform built for people in Bangladesh. It brings everyday grocery prices, historical price comparisons, and market-level pricing together in one clean, accessible interface so shoppers can make more informed, cheaper everyday decisions.",
    cover: {
      src: "/project-2/cover.png",
      alt: "BazarDor homepage cover",
      width: 1216,
      height: 732,
    },
    gallery: [
      {
        src: "/project-2/category.png",
        alt: "BazarDor category browsing page",
        width: 1207,
        height: 685,
      },
      {
        src: "/project-2/signin.png",
        alt: "BazarDor sign in page",
        width: 1212,
        height: 711,
      },
      {
        src: "/project-2/signup.png",
        alt: "BazarDor create account page",
        width: 1216,
        height: 764,
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB",
      "Google & GitHub OAuth",
      "React Hot Toast",
      "Vercel",
    ],
    features: [
      {
        title: "Market price tracking",
        items: [
          "Explore prices of everyday essentials in a clean interface",
          "Price history — compare current prices with previous records",
          "See price increases and decreases at a glance",
        ],
      },
      {
        title: "Browse & compare",
        items: [
          "Category-based product browsing",
          "Sort products by price to find suitable shopping options",
          "Explore price ranges across different markets",
        ],
      },
      {
        title: "Authentication & profile",
        items: [
          "Register and sign in, including supported social providers",
          "Manage your profile and access protected pages",
          "Sessions managed by Better Auth (Google & GitHub OAuth)",
        ],
      },
      {
        title: "Accessible, responsive UX",
        items: [
          "Bengali-friendly presentation throughout",
          "Modern interface designed for every screen size",
          "Built with server-side and client-side Next.js rendering",
        ],
      },
    ],
    challenges: [
      {
        challenge:
          "Protected pages and profiles needed real sessions with multiple social login providers.",
        solution:
          "Better Auth handles registration, session management, and provider configuration (Google & GitHub OAuth via environment variables); protected pages verify the session server-side before rendering.",
      },
      {
        challenge:
          "Market data had to render fast and SEO-friendly, while category browsing, sorting, and toasts stay interactive.",
        solution:
          "Next.js server components render the data-heavy price views; client components handle the interactive pieces, with React Hot Toast for feedback.",
      },
      {
        challenge:
          "Shoppers need to know not just today's price, but whether it went up or down.",
        solution:
          "Price history records are compared against the current price so the UI can surface increases and decreases as simple trend cues.",
      },
    ],
    future: [
      "Broader market and category coverage",
      "User-reported price submissions",
      "Price-drop alerts and notifications",
      "Richer per-market analytics",
    ],
    demo: "https://bazardor-nine-rust.vercel.app/",
    clientRepo: "https://github.com/poranmia2222/bazardor",
  },
];

export function getProjects(): readonly Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** `Map<slug, Project>` for O(1) lookups in dynamic pages */
export const PROJECT_INDEX: ReadonlyMap<string, Project> = new Map(
  PROJECTS.map((project) => [project.slug, project]),
);
