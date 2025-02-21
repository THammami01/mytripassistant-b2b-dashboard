import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  reCaptchaToken: z.string().min(1, "ReCaptcha verification is required"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
