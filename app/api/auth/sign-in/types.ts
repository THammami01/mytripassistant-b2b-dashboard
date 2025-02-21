import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  rememberMe: z.boolean().optional(),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type SignInFormType = z.infer<typeof signInSchema>;
