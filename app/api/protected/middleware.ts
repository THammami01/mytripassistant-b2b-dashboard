// app/api/protected/middleware-protected.ts
import { NextResponse } from "next/server";

import { getUserFromCookie } from "@/lib/auth"; // Your authentication logic here

export function middleware(req: Request) {
  // Check if the user is authenticated
  const user = getUserFromCookie(req);

  if (!user) {
    // If no user, return Unauthorized
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next(); // Proceed if authenticated
}

// Only apply to /api/protected routes
export const config = {
  matcher: "/api/protected/*",
};
