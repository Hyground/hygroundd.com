import { getSession } from "@/lib/auth";
import { adminAuthorizationStatus } from "@/lib/auth-policy";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  const status = adminAuthorizationStatus(session);
  if (status !== 200 || !session) {
    return Response.json(
      { error: status === 401 ? "Unauthenticated" : "Forbidden" },
      { status },
    );
  }
  return Response.json({ ok: true, role: session.user.role });
}
