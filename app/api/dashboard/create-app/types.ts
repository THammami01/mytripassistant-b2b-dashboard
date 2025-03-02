import { z } from "zod";

export enum AppPlatformEnum {
  WEB = "WEB",
  CROSS_PLATFORM = "CROSS_PLATFORM",
  IOS = "IOS",
  ANDROID = "ANDROID",
  MACOS = "MACOS",
  WINDOWS = "WINDOWS",
  LINUX = "LINUX",
  OTHER = "OTHER",
}

export const createAppFormSchema = z.object({
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

export type CreateAppFormType = z.infer<typeof createAppFormSchema>;
