import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

import { createSession, verifyReCaptchaToken } from "../helpers";

import { signInSchema } from "./types";

import prisma from "@/prisma/db";

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe, reCaptchaToken } =
      await signInSchema.parseAsync(await req.json());

    await verifyReCaptchaToken(reCaptchaToken);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const userWithoutSensitiveData = {
      ...user,
      hashedPassword: undefined,
      googleIds: undefined,
    };

    await createSession(user.id, rememberMe);

    return NextResponse.json({
      user: userWithoutSensitiveData,
    });
  } catch (err: any) {
    console.log(err);

    if (err instanceof z.ZodError) {
      const errorMessages = err.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
