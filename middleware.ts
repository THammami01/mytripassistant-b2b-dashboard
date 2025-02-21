import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/app/api/auth/helpers";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (isAuthPage && session) {
    const payload = await verifyJwtToken(session);

    if (payload && new Date(payload.expiresAt as Date) > new Date()) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // If user tries to access dashboard without auth, redirect to sign in
  if (isDashboardPage) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    const payload = await verifyJwtToken(session);

    if (
      !payload ||
      !payload.userId ||
      !payload.exp ||
      payload.exp * 1000 < Date.now()
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next({
      headers: {
        "x-user-id": payload.userId as string,
        "x-session": session,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
