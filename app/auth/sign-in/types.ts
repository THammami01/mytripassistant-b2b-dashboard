import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
  rememberMe: z.boolean().optional(),
  reCaptchaToken: z.string().optional(),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;
