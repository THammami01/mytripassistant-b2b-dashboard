"use server";

import prisma from "@/prisma/db";

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      company: true,
    },
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
