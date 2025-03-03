import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

import { createSession, verifyReCaptchaToken } from "../helpers";

import { resetPasswordSchema } from "./types";

import prisma from "@/prisma/db";

export async function POST(req: Request) {
  try {
    const { password, resetPasswordToken, reCaptchaToken } =
      await resetPasswordSchema.parseAsync(await req.json());

    await verifyReCaptchaToken(reCaptchaToken);

    const token = await prisma.token.findFirst({
      where: {
        value: resetPasswordToken,
        type: "PASSWORD_RESET",
      },
      include: { users: { include: { company: true } } },
    });

    if (!token || token.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: token.users[0].id },
        data: { hashedPassword },
      }),
      prisma.token.delete({
        where: { id: token.id },
      }),
    ]);

    await createSession(token.users[0].id);

    const userWithoutSensitiveData = {
      ...token.users[0],
      hashedPassword: undefined,
      passwordResetTokenId: undefined,
      googleIds: undefined,
      feedback: undefined,
    };

    return NextResponse.json({ user: userWithoutSensitiveData });
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
