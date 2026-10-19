import Link from "next/link";
import type { Tool } from "@/data/tools";
import { ToolAsset } from "@/components/tools/ToolAsset";
import type { ToolAssetKey } from "@/data/tool-assets";

const assetFor = (tool: Tool): ToolAssetKey => tool.icon === "PDF" ? "pdf" : tool.icon === "IMG" ? "image" : tool.icon === "TXT" ? "text" : tool.icon === "QR" ? "qr" : tool.icon === "KEY" ? "password" : tool.icon === "FIN" ? "card" : "calculator";

export function ToolCard({ tool, rank }: { tool: Tool; rank?: number }) {
  const clickable = Boolean(tool.route && (tool.status === "available" || tool.status === "beta"));
  const content = <><div className={`toolIcon toolIcon--${tool.category}`}><ToolAsset asset={assetFor(tool)} /></div><div className="toolCard__copy"><div className="toolCard__meta">{rank ? <span>#{rank}</span> : null}<span>{tool.status === "available" ? "Disponible" : tool.status === "beta" ? "Beta UI" : "Próximamente"}</span></div><h3>{tool.name}</h3><p>{tool.shortDescription}</p></div>{clickable ? <span className="toolCard__arrow" aria-hidden="true">→</span> : null}</>;
  return clickable ? <Link href={tool.route!} className="toolCard">{content}</Link> : <article className="toolCard" aria-label={`${tool.name}, próximamente`}>{content}</article>;
}
