import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/app/api/auth/helpers";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (isAuthPage && session) {
    const payload = await verifyJwtToken(session);

    if (payload && new Date(payload.expiresAt as Date) > new Date()) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If user tries to access dashboard without auth, redirect to sign in
  if (isDashboardPage) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const payload = await verifyJwtToken(session);

    if (!payload || new Date(payload.expiresAt as Date) < new Date()) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return NextResponse.next({
      headers: {
        "x-user-id": payload.userId as string,
        "x-session": session, // TODO: Remove this header and use cookies
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
