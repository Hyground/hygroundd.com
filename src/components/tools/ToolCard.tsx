import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool, rank }: { tool: Tool; rank?: number }) {
  const content = <><div className={`toolIcon toolIcon--${tool.category}`} aria-hidden="true">{tool.icon}</div><div className="toolCard__copy"><div className="toolCard__meta">{rank ? <span>#{rank}</span> : null}<span>{tool.status === "available" ? "Disponible" : tool.status === "beta" ? "Beta" : "Próximamente"}</span></div><h3>{tool.name}</h3><p>{tool.shortDescription}</p></div>{tool.status === "available" ? <span className="toolCard__arrow" aria-hidden="true">→</span> : null}</>;
  return tool.status === "available" && tool.route ? <Link href={tool.route} className="toolCard">{content}</Link> : <article className="toolCard" aria-label={`${tool.name}, próximamente`}>{content}</article>;
}
