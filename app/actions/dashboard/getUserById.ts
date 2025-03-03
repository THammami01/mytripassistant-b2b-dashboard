"use server";

import prisma from "@/prisma/db";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      company: true,
      apps: true,
    },
  });

  if (!user) {
    return null;
  }

  const userWithoutSensitiveData = {
    ...user,
    hashedPassword: undefined,
    passwordResetTokenId: undefined,
    googleIds: undefined,
    feedback: undefined,
  };

  return userWithoutSensitiveData;
}
