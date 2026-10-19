/**
 * Central URL configuration. Leave unknown destinations as null.
 * Proposed subdomains are labels only and are not active destinations.
 */
export const siteLinks = {
  github: null,
  linkedin: null,
  email: null,
  resume: null,
} satisfies Record<string, string | null>;

export const projectDestinations = {
  slot01: null,
  slot02: null,
  slot03: null,
  hub: "#home",
} satisfies Record<string, string | null>;

export const proposedSubdomains = {
  slot01: "project.hygroundd.com",
  slot02: "lab.hygroundd.com",
  slot03: "dev.hygroundd.com",
} as const;
