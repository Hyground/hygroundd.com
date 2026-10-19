type Props = { placement: "home-after-popular" | "home-after-categories" | "tool-before-action" | "tool-processing" | "tool-after-result"; variant?: "banner" | "inline"; className?: string };

export function AdSlot({ placement, variant = "banner", className = "" }: Props) {
  return <aside className={`adSlot adSlot--${variant} ${className}`} aria-label="Espacio publicitario" data-placement={placement}><span>PUBLICIDAD</span></aside>;
}
