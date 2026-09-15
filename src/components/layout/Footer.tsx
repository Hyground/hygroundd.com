import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return <footer className="toolsFooter"><div><strong>{siteConfig.name}</strong><p>{siteConfig.tagline}</p></div><nav aria-label="Navegación secundaria">{siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><nav aria-label="Información legal"><span>Privacidad</span><span>Términos</span><span>Contacto</span></nav><small>© {new Date().getFullYear()} {siteConfig.name}.</small></footer>;
}
