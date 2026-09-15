"use client";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function login(form: FormData) { setLoading(true); setError(""); const response = await fetch("/api/auth/login", { method: "POST", body: form }); if (response.ok) window.location.assign("/admin"); else { setError("Credenciales inválidas"); setLoading(false); } }
  return <form className="loginForm" action={login}><label>USUARIO<input name="username" autoComplete="username" required /></label><label>CONTRASEÑA<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="cardError" role="alert">{error}</p>}<button className="cardButton" disabled={loading}>{loading ? "VERIFICANDO…" : "INICIAR SESIÓN"}</button></form>;
}
