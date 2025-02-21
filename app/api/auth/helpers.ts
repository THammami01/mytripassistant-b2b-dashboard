"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { JWT_SECRET, GOOGLE_RECAPTCHA_V3_SECRET_KEY } from "@/config/constants";

const encodedKey = new TextEncoder().encode(JWT_SECRET);

export const verifyReCaptchaToken = async (token: string) => {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_V3_SECRET_KEY}&response=${token}`
  );
  const data = await response.json();

  if (!data.success || data.score < 0.5)
    throw new Error("ReCaptchaVerificationError");

  return data.success;
};

export const createSession = async (userId: string, rememberMe = false) => {
  const expirationDays = rememberMe ? 15 : 1;
  const expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
  const session = await signJwtToken({ userId, expiresAt }, expirationDays);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    ...(rememberMe && { maxAge: expirationDays * 24 * 60 * 60 }),
    expires: expiresAt,
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export const signJwtToken = async (
  payload: SessionPayload,
  expirationDays: number
) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expirationDays}d`)
    .sign(encodedKey);
};

export const verifyJwtToken = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (_error) {
    console.log("Failed to verify session");
  }
};
