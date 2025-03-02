import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { headers } from "next/dist/server/request/headers";

import { changePasswordSchema } from "./types";

import prisma from "@/prisma/db";

export async function PUT(req: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const { currentPassword, newPassword } =
      await changePasswordSchema.parseAsync(await req.json());

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

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { hashedPassword: hashedNewPassword },
    });

    const userWithoutSensitiveData = {
      ...updatedUser,
      hashedPassword: undefined,
      passwordResetTokenId: undefined,
      googleIds: undefined,
      feedback: undefined,
      company: user.company,
    };

    return NextResponse.json(userWithoutSensitiveData);
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
