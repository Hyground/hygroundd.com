import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return <main className="hubShell"><Header /><section className="loginPage"><div><p className="hubEyebrow">01 / ACCESO PRIVADO</p><h1>INICIAR <span>SESIÓN</span></h1><p>Acceso para administrar Hygroundd y sus herramientas.</p></div><LoginForm /></section></main>;
}
