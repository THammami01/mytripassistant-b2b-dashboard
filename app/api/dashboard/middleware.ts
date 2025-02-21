import { NextRequest, NextResponse } from "next/server";

import { verifyJwtToken } from "../auth/helpers";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyJwtToken(session);

  if (
    !payload ||
    !payload.userId ||
    !payload.exp ||
    payload.exp * 1000 < Date.now()
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.next();

  response.headers.set("x-user-id", payload.userId.toString());

  return response;
}

export const config = {
  matcher: "/api/dashboard/*",
};
