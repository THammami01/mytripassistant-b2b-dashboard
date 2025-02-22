import { NextResponse } from "next/server";

import { deleteSession } from "../helpers";

export async function POST(_req: Request) {
  try {
    await deleteSession();

    return NextResponse.json({ message: "Signed out successfully" });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
