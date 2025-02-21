import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { verifyJwtToken } from "@/app/api/auth/helpers";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const payload = await verifyJwtToken(session);

    if (!payload) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", payload.userId as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
