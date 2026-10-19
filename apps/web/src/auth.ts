import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { accounts, authSchema } from "@/db/schema";
import { hasVerifiedGoogleIdentity } from "@/lib/auth-policy";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, authSchema),
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production",
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      checks: ["pkce", "state", "nonce"],
      authorization: {
        params: {
          scope: "openid email profile",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    signIn({ account, profile }) {
      return hasVerifiedGoogleIdentity(account, profile);
    },
    async session({ session, user }) {
      const [identity] = await db
        .select({ googleSubject: accounts.providerAccountId })
        .from(accounts)
        .where(and(eq(accounts.userId, user.id), eq(accounts.provider, "google")))
        .limit(1);

      session.user.id = user.id;
      session.user.role = user.role;
      session.user.googleSubject = identity?.googleSubject ?? "";
      return session;
    },
  },
});
