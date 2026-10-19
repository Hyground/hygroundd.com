import { NextResponse, type NextRequest } from "next/server";

const legacyCookieName = "hygroundd_session";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.cookies.has(legacyCookieName)) {
    response.cookies.set(legacyCookieName, "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export const config = {
  matcher: [
    {
      source: "/:path*",
      has: [{ type: "cookie", key: "hygroundd_session" }],
    },
  ],
};
