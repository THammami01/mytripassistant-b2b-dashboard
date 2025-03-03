import { NextRequest, NextResponse } from "next/server";

import { reviewAppSchema } from "./types";

import prisma from "@/prisma/db";

export async function POST(request: NextRequest) {
  try {
    const { appId, reviewStatus, reviewToken } =
      await reviewAppSchema.parseAsync(await request.json());

    const app = await prisma.app.findFirst({
      where: {
        id: appId,
        reviewToken: {
          value: reviewToken,
        },
      },
    });

    if (!app) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }

    await prisma.app.update({
      where: { id: appId },
      data: { reviewStatus },
    });

    await prisma.token.delete({
      where: { id: app.reviewTokenId! },
    });

    return NextResponse.json({ message: "App reviewed" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
