export type ProjectStatus = "concept" | "in-progress" | "live" | "archived";

export interface Project {
  name: string;
  description: string;
  image: string | null;
  status: ProjectStatus;
  technologies: string[];
  url: string | null;
  githubUrl: string | null;
  subdomain?: string;
  visualLabel: string;
  tone: "cyan" | "violet" | "pink" | "indigo";
  placeholder: boolean;
}

export type ActivityType = "project" | "deployment" | "system" | "note";

export interface ActivityItem {
  title: string;
  description: string;
  timestamp: string;
  type: ActivityType;
  url?: string;
  placeholder: boolean;
}

export interface ResourceLink {
  title: string;
  description: string;
  href: string | null;
  icon: "github" | "linkedin" | "mail" | "file" | "link";
  external: boolean;
}
