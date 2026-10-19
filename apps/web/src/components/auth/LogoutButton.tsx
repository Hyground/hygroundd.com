import { endSession } from "@/app/login/actions";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";

export function LogoutButton() {
  return <form action={endSession}><AuthSubmitButton pendingLabel="Cerrando…">Cerrar sesión</AuthSubmitButton></form>;
}
