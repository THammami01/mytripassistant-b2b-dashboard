import { z } from "zod";

enum AppReviewStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export const reviewAppSchema = z.object({
  appId: z.string(),
  reviewStatus: z.nativeEnum(AppReviewStatus),
  reviewToken: z.string(),
});

export type ReviewAppRequestType = z.infer<typeof reviewAppSchema>;
