import { z } from "zod";

enum Rating {
  BAD = "BAD",
  NEUTRAL = "NEUTRAL",
  GOOD = "GOOD",
  GREAT = "GREAT",
}

export const giveFeedbackRequestSchema = z.object({
  content: z.string(),
  rating: z.nativeEnum(Rating),
});

export type GiveFeedbackRequestType = z.infer<typeof giveFeedbackRequestSchema>;

export type GiveFeedbackResponseType = {
  message: string;
};
