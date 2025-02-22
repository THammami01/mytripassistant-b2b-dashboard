import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createSession, verifyReCaptchaToken } from "../helpers";

import { continueWithGoogleSchema } from "./";

import { GOOGLE_CLIENT_ID } from "@/config/public-constants";
import prisma from "@/prisma/db";
import googleOAuth2Client from "@/config/google-auth2-client";

export async function POST(req: Request) {
  try {
    const { oauthCode, reCaptchaToken } =
      await continueWithGoogleSchema.parseAsync(await req.json());

    await verifyReCaptchaToken(reCaptchaToken);

    const { tokens } = await googleOAuth2Client.getToken(oauthCode);

    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.name || !payload?.email) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      if (!existingUser.googleIds.includes(payload.sub)) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            googleIds: [...existingUser.googleIds, payload.sub],
          },
        });
      }

      const userWithoutSensitiveData = {
        ...existingUser,
        hashedPassword: undefined,
        googleIds: undefined,
      };

      await createSession(existingUser.id, true);

      return NextResponse.json({
        user: userWithoutSensitiveData,
        isNewAccount: false,
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          hashedPassword: await bcrypt.hash(crypto.randomUUID(), 10),
          googleIds: [payload.sub],
        },
      });

      const userWithoutSensitiveData = {
        ...newUser,
        hashedPassword: undefined,
        googleIds: undefined,
      };

      await createSession(newUser.id, true);

      return NextResponse.json(
        {
          user: userWithoutSensitiveData,
          isNewAccount: true,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
