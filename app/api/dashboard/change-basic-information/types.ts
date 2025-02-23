import { z } from "zod";

export const changeBasicInformationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  website: z
    .string()
    .min(1, "Website is required")
    .url("Please enter a valid URL"),
});

export type ChangeBasicInformationFormType = z.infer<
  typeof changeBasicInformationFormSchema
>;
