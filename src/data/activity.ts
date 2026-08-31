import type { ActivityItem } from "@/types";

// Local v1 placeholders; this shape can later be populated by an API adapter.
export const activityItems: ActivityItem[] = [
  { title: "Project hub foundation", description: "Demo entry showing how deployment activity will appear.", timestamp: "Demo timestamp", type: "deployment", placeholder: true },
  { title: "Project slot prepared", description: "Demo entry showing how project activity will appear.", timestamp: "Demo timestamp", type: "project", placeholder: true },
  { title: "Design system update", description: "Demo entry showing how system activity will appear.", timestamp: "Demo timestamp", type: "system", placeholder: true },
];
