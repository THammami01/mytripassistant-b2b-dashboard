"use server";

import prisma from "@/prisma/db";

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  const userWithoutSensitiveData = {
    ...user,
    hashedPassword: undefined,
    googleIds: undefined,
  };

  return userWithoutSensitiveData;
}
