import crypto from "crypto";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/prisma/db";
import { globalHTMLTemplate, reviewAppBlock } from "@/emails";
import { APP_REVIEW_EMAIL_ADDRESSES } from "@/config/server-constants";
import { sendEmail } from "@/config/resend";
import { getFormattedDate } from "@/config/helpers";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const { name, description, url, platform } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const app = await prisma.app.create({
      data: {
        name,
        description,
        url,
        platform,
        userId: id,
      },
    });

    const reviewAppToken = `${uuidv4()}-${crypto.randomBytes(64).toString("base64url")}`;

    const token = await prisma.token.create({
      data: {
        type: "REVIEW_APP",
        value: reviewAppToken,
        expiresAt: new Date(Date.now() + 604800000), // 1 week
      },
    });

    await prisma.app.update({
      where: { id: app.id },
      data: {
        reviewTokenId: token.id,
      },
    });

    const appDetails = `
      App Details:<br/>
      - ID: ${app.id}<br/>
      - Name: ${app.name}<br/>
      - Description: ${app.description}<br/>
      - URL: ${app.url}<br/>
      - Platform: ${app.platform}<br/>
      - Created At: ${getFormattedDate(app.createdAt)}<br/><br/>
      User and Company Details (at the time of request):<br/>
      - ID: ${id}<br/>
      - Email: ${user.email}<br/>
      - First Name: ${user.firstName}<br/>
      - Last Name: ${user.lastName}<br/>
      - Address: ${user.company?.address}<br/>
      - State: ${user.company?.state}<br/>
      - Zip Code: ${user.company?.zipCode}<br/>
      - Country: ${user.company?.country}<br/>
      - Phone Number: ${user.company?.phoneNumber}<br/>
      - Website: ${user.company?.website}<br/>
      - Created At: ${getFormattedDate(user.createdAt)}<br/>
      - Updated At: ${getFormattedDate(user.updatedAt > user.company!.updatedAt ? user.updatedAt : user.company!.updatedAt)}`;
    const reviewAppUrl = `${process.env.NEXT_PUBLIC_APP_URL}/internal/review-app?token=${reviewAppToken}`;
    const emailSubject = "Review App";
    const emailBody = globalHTMLTemplate
      .replace(/\$__SUBJECT__/g, emailSubject)
      .replace(/\$__CONTENT__/g, reviewAppBlock)
      .replace(/\$__APP_DETAILS__/g, appDetails)
      .replace(/\$__REVIEW_APP_URL__/g, reviewAppUrl);

    await sendEmail(
      APP_REVIEW_EMAIL_ADDRESSES.split(","),
      emailSubject,
      emailBody
    );

    return NextResponse.json({ app }, { status: 201 });
  } catch (err) {
    console.error(err);

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
