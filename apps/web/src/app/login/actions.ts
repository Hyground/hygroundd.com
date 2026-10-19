"use server";

import { signIn, signOut } from "@/auth";
import { safeRedirectPath } from "@/lib/auth-policy";

export async function startGoogleSignIn(formData: FormData) {
  const redirectTo = safeRedirectPath(formData.get("callbackUrl"), "/card");
  await signIn("google", { redirectTo });
}

export async function endSession() {
  await signOut({ redirectTo: "/" });
}
