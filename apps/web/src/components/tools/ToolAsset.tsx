import type { ToolAssetKey } from "@/data/tool-assets";
import { toolAssets } from "@/data/tool-assets";

export function ToolAsset({ asset, className = "" }: { asset: ToolAssetKey; className?: string }) {
  const item = toolAssets[asset];
  return <span className={`toolAsset toolAsset--${item.tone} ${className}`} aria-hidden="true">{item.fallback}</span>;
}
