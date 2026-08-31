import type { ResourceLink } from "@/types";
import { siteLinks } from "./site";

export const resourceLinks: ResourceLink[] = [
  { title: "GitHub", description: "Profile URL not configured", href: siteLinks.github, icon: "github", external: true },
  { title: "LinkedIn", description: "Profile URL not configured", href: siteLinks.linkedin, icon: "linkedin", external: true },
  { title: "Email / Contact", description: "Contact details not configured", href: siteLinks.email, icon: "mail", external: false },
  { title: "Resume", description: "Resume URL not configured", href: siteLinks.resume, icon: "file", external: true },
];
