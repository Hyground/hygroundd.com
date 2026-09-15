import { Header } from "@/components/layout/Header";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  await requireAdmin();
  return <main className="hubShell"><Header /><section className="adminPage"><p className="hubEyebrow">01 / ADMINISTRACIÓN</p><h1>PANEL <span>ADMIN</span></h1><p>El contenido editable y la persistencia se incorporarán en la siguiente fase.</p><div className="adminGrid"><a href="/card">Card Manager</a><span>Herramientas · pendiente</span><span>Proyectos · pendiente</span><span>Publicaciones · pendiente</span></div></section></main>;
}
