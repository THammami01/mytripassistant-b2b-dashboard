import { NextResponse } from "next/server";

export function middleware(_req: Request) {
  // Check if the user is authenticated

  // if (!user) {
  //   // If no user, return Unauthorized
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  return NextResponse.next(); // Proceed if authenticated
}

export const config = {
  matcher: "/api/protected/*",
};
