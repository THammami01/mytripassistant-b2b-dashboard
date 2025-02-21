import { z } from "zod";

export const signUpFormSchema = z.object({
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
  confirmedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  agreeWithTermsAndPrivacy: z.boolean().refine((val) => val === true),
  reCaptchaToken: z.string().optional(),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
