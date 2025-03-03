import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import { Rating } from "@prisma/client";

import { giveFeedbackRequestSchema } from "./types";

import prisma from "@/prisma/db";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const { content, rating } = await giveFeedbackRequestSchema.parseAsync(
      await req.json()
    );

    await prisma.feedback.create({
      data: { content, rating, userId: id },
    });

    return NextResponse.json(
      { message: "Feedback created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

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
