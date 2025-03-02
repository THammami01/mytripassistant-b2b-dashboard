import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";

import prisma from "@/prisma/db";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const { name, description, url, platform } = await req.json();

    const app = await prisma.app.create({
      data: {
        name,
        description,
        url,
        platform,
        userId: id,
      },
    });

    return NextResponse.json({ app }, { status: 201 });
  } catch (err) {
    console.log(err);

    if (err instanceof z.ZodError) {
      const errorMessages = err.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
