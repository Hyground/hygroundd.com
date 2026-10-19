import { startGoogleSignIn } from "@/app/login/actions";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form className="loginForm googleLoginForm" action={startGoogleSignIn}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <p>Usá tu cuenta de Google para acceder. Hygroundd no recibe ni almacena contraseñas.</p>
      <AuthSubmitButton className="googleButton" pendingLabel="CONECTANDO CON GOOGLE…">
        <GoogleMark />
        CONTINUAR CON GOOGLE
      </AuthSubmitButton>
      <small>Google verificará tu identidad mediante OAuth 2.0 y OpenID Connect.</small>
    </form>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9.1L6.5 14Z" />
      <path fill="#EA4335" d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.4 2.7A5.9 5.9 0 0 1 12 6Z" />
    </svg>
  );
}
