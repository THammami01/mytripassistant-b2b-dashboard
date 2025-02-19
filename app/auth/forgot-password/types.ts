import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
  reCaptchaToken: z.string().optional(),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;
