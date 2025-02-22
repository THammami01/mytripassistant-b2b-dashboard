import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
