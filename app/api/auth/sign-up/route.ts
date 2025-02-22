import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyReCaptchaToken, createSession } from "../helpers";

import { signUpSchema } from "./";

import prisma from "@/prisma/db";

export async function POST(req: Request) {
  try {
    const { email, password, reCaptchaToken } = await signUpSchema.parseAsync(
      await req.json()
    );

    await verifyReCaptchaToken(reCaptchaToken);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });

    const userWithoutSensitiveData = {
      ...user,
      hashedPassword: undefined,
      googleIds: undefined,
    };

    await createSession(user.id);

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
