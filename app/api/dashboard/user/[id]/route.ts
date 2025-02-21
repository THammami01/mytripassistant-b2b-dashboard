import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
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
