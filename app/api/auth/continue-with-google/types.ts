import { z } from "zod";

export const continueWithGoogleSchema = z.object({
  oauthCode: z.string().min(1, "OAuth code is required"),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type ContinueWithGoogleFormType = z.infer<
  typeof continueWithGoogleSchema
>;
