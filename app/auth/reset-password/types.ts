import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  password: z.string().min(8).max(64),
  confirmedPassword: z.string().min(8).max(64),
  reCaptchaToken: z.string().optional(),
});

export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;
