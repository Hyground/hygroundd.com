import type { Project } from "@/types";
import { projectDestinations, proposedSubdomains } from "./site";

// Replace a slot's placeholder fields when a project is ready to publish.
// The layout automatically accommodates additional entries.
export const projects: Project[] = [
  { name: "Project Slot 01", description: "Placeholder reserved for a future Hygroundd project.", image: null, status: "concept", technologies: ["To be announced"], url: projectDestinations.slot01, githubUrl: null, subdomain: proposedSubdomains.slot01, visualLabel: "01", tone: "cyan", placeholder: true },
  { name: "Project Slot 02", description: "Placeholder reserved for a future experiment.", image: null, status: "concept", technologies: ["To be announced"], url: projectDestinations.slot02, githubUrl: null, subdomain: proposedSubdomains.slot02, visualLabel: "LAB", tone: "violet", placeholder: true },
  { name: "Project Slot 03", description: "Placeholder reserved for future software.", image: null, status: "concept", technologies: ["To be announced"], url: projectDestinations.slot03, githubUrl: null, subdomain: proposedSubdomains.slot03, visualLabel: "DEV", tone: "pink", placeholder: true },
  { name: "Hygroundd Hub", description: "Version one of the central Hygroundd project hub.", image: null, status: "in-progress", technologies: ["Next.js", "TypeScript", "Tailwind CSS"], url: projectDestinations.hub, githubUrl: null, visualLabel: "H.", tone: "indigo", placeholder: false },
];
