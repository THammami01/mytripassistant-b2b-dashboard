import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { AppReviewStatus } from "@prisma/client";

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
      data: {
        reviewStatus,
        ...(reviewStatus === AppReviewStatus.ACCEPTED
          ? { apiKey: `AK-${uuidv4().replace(/-/g, "").slice(0, 12)}` }
          : {}),
      },
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
