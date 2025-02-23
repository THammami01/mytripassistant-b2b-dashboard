import crypto from "crypto";

import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { verifyReCaptchaToken } from "../helpers";

import { forgotPasswordSchema } from "./types";

import prisma from "@/prisma/db";
import { globalHTMLTemplate, resetPasswordBlock } from "@/emails";
import { sendEmail } from "@/config/resend";

export async function POST(req: Request) {
  try {
    const { email, reCaptchaToken } = await forgotPasswordSchema.parseAsync(
      await req.json()
    );

    await verifyReCaptchaToken(reCaptchaToken);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetPasswordToken = `${uuidv4()}-${crypto.randomBytes(64).toString("base64url")}`;

    await prisma.token.upsert({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
      },
      create: {
        type: "PASSWORD_RESET",
        value: resetPasswordToken,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
        userId: user.id,
      },
      update: {
        value: resetPasswordToken,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetPasswordToken}`;
    const emailSubject = "Reset your password";
    const emailBody = globalHTMLTemplate
      .replace(/\$__SUBJECT__/g, emailSubject)
      .replace(/\$__CONTENT__/g, resetPasswordBlock)
      .replace(
        /\$__GREETING__/g,
        user.firstName ? `Hi&nbsp;${user.firstName}` : "Hi"
      )
      .replace(/\$__RESET_PASSWORD_URL__/g, resetPasswordUrl);

    await sendEmail(email, emailSubject, emailBody);

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
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
