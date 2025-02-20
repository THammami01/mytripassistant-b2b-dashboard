// app/api/protected/route.ts
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  // Protected content accessible only to authenticated users
  return NextResponse.json({ message: "This is protected data!" });
}
