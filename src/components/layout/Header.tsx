import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/LogoutButton";

const links = [["Inicio", "/"], ["Herramientas", "/tools"], ["Proyectos", "/projects"], ["Publicaciones", "/posts"], ["Acerca de", "/about"]] as const;

export async function Header() {
  const session = await getSession();
  return <header className="hubHeader"><Link className="wordmark" href="/" aria-label="Inicio Hygroundd"><span className="mark">H</span><span>HYGROUNDD</span></Link><nav className="hubNav" aria-label="Navegación principal">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><div className="hubAccount">{session ? <><Link href="/admin">Panel Admin</Link><LogoutButton /></> : <Link href="/login">Iniciar sesión</Link>}</div><details className="hubMenu"><summary aria-label="Abrir menú">☰</summary><nav>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}{session ? <><Link href="/admin">Panel Admin</Link><LogoutButton /></> : <Link href="/login">Iniciar sesión</Link>}</nav></details></header>;
}
