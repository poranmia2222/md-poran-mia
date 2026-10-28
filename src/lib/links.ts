/* Shared site navigation — single source of truth for the navbar (scroll-spy)
   and the footer's quick links. Each `id` matches a section's DOM id on "/".
   Hrefs are rendered as `/#id`, which keeps them scroll targets on the home
   route and safe jump-backs from the /projects detail pages. */

export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
