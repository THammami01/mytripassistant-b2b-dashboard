import { NextResponse } from "next/server";

import { deleteSession } from "../helpers";

export async function POST(_req: Request) {
  await deleteSession();

  return NextResponse.json({ message: "Signed out successfully" });
}
