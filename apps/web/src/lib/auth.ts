import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { adminAuthorizationStatus, safeRedirectPath } from "@/lib/auth-policy";

export async function getSession() {
  const session = await auth();
  return session?.user?.id && session.user.googleSubject ? session : null;
}

export async function requireUser(returnTo = "/") {
  const session = await getSession();
  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent(safeRedirectPath(returnTo))}`);
  return session;
}

export async function requireAdmin(returnTo = "/admin") {
  const session = await getSession();
  const status = adminAuthorizationStatus(session);
  const callbackUrl = encodeURIComponent(safeRedirectPath(returnTo, "/admin"));
  if (status === 401) redirect(`/login?callbackUrl=${callbackUrl}`);
  if (status === 403) redirect(`/login?error=AccessDenied&callbackUrl=${callbackUrl}`);
  return session;
}
