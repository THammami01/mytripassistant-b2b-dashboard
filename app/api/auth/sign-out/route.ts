import { NextResponse } from "next/server";

import { deleteSession } from "../helpers";

export async function POST(_req: Request) {
  try {
    await deleteSession();

    return NextResponse.json({ message: "Signed out successfully" });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
