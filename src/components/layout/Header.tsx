import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getSession } from "@/lib/auth";
import { siteConfig } from "@/data/site-config";

export async function Header() {
  const session = await getSession();
  return <header className="toolsHeader"><Link className="toolsBrand" href="/" aria-label={"Inicio "+siteConfig.name}>{siteConfig.logo ? <img src={siteConfig.logo} alt="" /> : <span aria-hidden="true">H</span>}<b>{siteConfig.name.toUpperCase()}</b></Link><nav className="toolsNav" aria-label="Navegación principal">{siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><div className="toolsHeaderActions"><a className="searchJump" href="/#tools-search" aria-label="Buscar herramientas">⌕</a>{session ? <><Link href="/admin">Panel Admin</Link><LogoutButton /></> : <Link href="/login">Iniciar sesión</Link>}</div><details className="toolsMenu"><summary aria-label="Abrir menú"><i /><i /><i /></summary><nav>{siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}{session ? <><Link href="/admin">Panel Admin</Link><LogoutButton /></> : <Link href="/login">Iniciar sesión</Link>}</nav></details></header>;
}
