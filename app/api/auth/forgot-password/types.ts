import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
  reCaptchaToken: z.string(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
