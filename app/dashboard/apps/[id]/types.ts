import { z } from "zod";

import { AppPlatformEnum } from "@/app/dashboard/apps/types";

export const updateAppBasicInformationFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url("Please enter a valid URL"),
  platform: z.enum([
    AppPlatformEnum.WEB,
    AppPlatformEnum.CROSS_PLATFORM,
    AppPlatformEnum.IOS,
    AppPlatformEnum.ANDROID,
    AppPlatformEnum.MACOS,
    AppPlatformEnum.WINDOWS,
    AppPlatformEnum.LINUX,
    AppPlatformEnum.OTHER,
  ]),
});

export const updateAppUsageFormSchema = z.object({
  tokenGenerationOriginsWhitelist: z
    .string()
    .min(1, { message: "Token generation origins whitelist is required" })
    .refine(
      (value) => {
        const urls = value.split("\n");

        return urls.every((url) => {
          try {
            new URL(url.trim());

            return true;
          } catch {
            return false;
          }
        });
      },
      { message: "Please enter valid URLs separated by new lines" }
    ),
});

export const updateAppPartnerKeysFormSchema = z.object({
  getYourGuideAPIKey: z
    .string()
    .min(1, { message: "GetYourGuide API key is required" }),
  travelpayoutsAPIKey: z
    .string()
    .min(1, { message: "Travelpayouts API key is required" }),
});

export type UpdateAppBasicInformationFormType = z.infer<
  typeof updateAppBasicInformationFormSchema
>;

export type UpdateAppUsageFormType = z.infer<typeof updateAppUsageFormSchema>;

export type UpdateAppPartnerKeysFormType = z.infer<
  typeof updateAppPartnerKeysFormSchema
>;
