import { z } from "zod";

import { RatingValueEnum } from "./FeedbackRatingItem";

export const giveFeedbackFormSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters long" }),
  rating: z.enum([
    RatingValueEnum.BAD,
    RatingValueEnum.NEUTRAL,
    RatingValueEnum.GOOD,
    RatingValueEnum.GREAT,
  ]),
});

export type GiveFeedbackFormType = z.infer<typeof giveFeedbackFormSchema>;
