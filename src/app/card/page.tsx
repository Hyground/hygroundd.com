import { cookies } from "next/headers";
import { CardDashboard } from "@/components/card/CardDashboard";
import { CardLogin } from "@/components/card/CardLogin";
import { cardSession, hasValidSession } from "@/lib/card-auth";

export const dynamic = "force-dynamic";

export default async function CardPage() {
  const session = (await cookies()).get(cardSession.name)?.value;
  return hasValidSession(session) ? <CardDashboard /> : <CardLogin />;
}
