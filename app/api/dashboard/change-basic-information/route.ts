import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { changeBasicInformationFormSchema } from ".";

import prisma from "@/prisma/db";

export async function PUT(request: NextRequest) {
  try {
    const headersList = await headers();
    const id = headersList.get("x-user-id")!;

    const { firstName, lastName, ...companyInformation } =
      await changeBasicInformationFormSchema.parseAsync(await request.json());

    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
      },
    });

    const company = await prisma.company.upsert({
      where: { userId: id },
      update: {
        name: companyInformation.companyName,
        address: companyInformation.address,
        state: companyInformation.state,
        zipCode: companyInformation.zipCode,
        country: companyInformation.country,
        phoneNumber: companyInformation.phoneNumber,
        website: companyInformation.website,
      },
      create: {
        userId: id,
        name: companyInformation.companyName,
        address: companyInformation.address,
        state: companyInformation.state,
        zipCode: companyInformation.zipCode,
        country: companyInformation.country,
        phoneNumber: companyInformation.phoneNumber,
        website: companyInformation.website,
      },
    });

    const userWithoutSensitiveData = {
      ...user,
      hashedPassword: undefined,
      passwordResetTokenId: undefined,
      googleIds: undefined,
      feedback: undefined,
      company,
    };

    return NextResponse.json(userWithoutSensitiveData);
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
