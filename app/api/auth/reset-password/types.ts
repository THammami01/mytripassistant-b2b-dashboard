import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
