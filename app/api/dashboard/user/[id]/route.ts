import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import prisma from "@/prisma/db";

export async function GET(_req: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        apps: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userWithoutSensitiveData = {
      ...user,
      hashedPassword: undefined,
      passwordResetTokenId: undefined,
      googleIds: undefined,
      feedback: undefined,
    };

    return NextResponse.json(userWithoutSensitiveData);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
