// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const newUser = await signUpUser(username, password);

  if (newUser) {
    // Set a cookie or session here
    return NextResponse.json({ message: "Sign-up successful", newUser });
  } else {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}
