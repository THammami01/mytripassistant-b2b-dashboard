"use server";

import prisma from "@/prisma/db";

export async function getAppByReviewToken(reviewToken: string) {
  const app = await prisma.app.findFirst({
    where: {
      reviewToken: {
        value: reviewToken
      }
    },
    include: {
      user: {
        include: {
          company: true,
        },
      },
    },
  });

  const pendingAppsFromAllUsersCount = await prisma.app.count({
    where: {
      reviewStatus: "PENDING",
    },
  });

  if (!app) {
    return null;
  }

  const appWithoutSensitiveData = {
    ...app,
    user: {
      ...app.user,
      hashedPassword: undefined,
      passwordResetTokenId: undefined,
      googleIds: undefined,
      feedback: undefined,
    },
    pendingAppsFromAllUsersCount,
  };

  return appWithoutSensitiveData;
}
