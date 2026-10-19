import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getSession } from "@/lib/auth";
import { safeRedirectPath } from "@/lib/auth-policy";

const errorMessages: Record<string, string> = {
  AccessDenied: "Tu cuenta de Google es válida, pero no tiene permisos para acceder a ese destino.",
  OAuthCallback: "Google no pudo completar el inicio de sesión. Intentá nuevamente.",
  OAuthSignin: "No fue posible iniciar la conexión segura con Google.",
  Configuration: "El acceso con Google todavía no está configurado en este entorno.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const callbackUrl = safeRedirectPath(first(params.callbackUrl), "/card");
  const error = first(params.error);
  const session = await getSession();

  if (session && !error && (callbackUrl !== "/admin" || session.user.role === "admin")) redirect(callbackUrl);

  const message = error ? errorMessages[error] ?? "No se pudo completar el inicio de sesión." : null;
  return (
    <main className="hubShell">
      <Header />
      <section className="loginPage">
        <div>
          <p className="hubEyebrow">01 / ACCESO SEGURO</p>
          <h1>INICIAR <span>SESIÓN</span></h1>
          <p>Una sola identidad para tus datos privados y, si tu rol lo permite, la administración de Hygroundd.</p>
          {message && <p className="authError" role="alert">{message}</p>}
        </div>
        {session ? (
          <section className="loginForm googleLoginForm">
            <p>Sesión iniciada como <strong>{session.user.email}</strong>.</p>
            <p>Para usar otra cuenta de Google, cerrá esta sesión primero.</p>
            <LogoutButton />
          </section>
        ) : <LoginForm callbackUrl={callbackUrl} />}
      </section>
    </main>
  );
}
