import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
  reCaptchaToken: z.string().optional(),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;
