import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
  confirmedPassword: z.string().min(8).max(64),
  agreeWithTermsAndPrivacy: z.boolean().refine((val) => val === true),
  reCaptchaToken: z.string().optional(),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
