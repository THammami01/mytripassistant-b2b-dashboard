import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type ForgetPasswordFormType = z.infer<typeof forgetPasswordSchema>;