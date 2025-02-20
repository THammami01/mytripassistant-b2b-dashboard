import { NextResponse } from "next/server";
import { z } from "zod";

import { createSession } from "../helpers";

const testUser = {
  id: "1",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function POST(req: Request) {
  const result = userSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return NextResponse.json(
      {
        errors: {
          email: ["Invalid email or password"],
        },
      },
      { status: 400 }
    );
  }

  await createSession(testUser.id);

  return NextResponse.json({ message: "Sign-in successful", user: testUser });
}
