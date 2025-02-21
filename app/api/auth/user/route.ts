import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import prisma from "@/prisma/db";

export async function GET(_req: NextRequest) {
  try {
    const headersList = await headers();

    const userId = headersList.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userWithoutSensitiveData = {
      ...user,
      hashedPassword: undefined,
      googleIds: undefined,
    };

    return NextResponse.json(userWithoutSensitiveData);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
