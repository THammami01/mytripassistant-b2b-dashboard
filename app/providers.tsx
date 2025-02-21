"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_RECAPTCHA_V3_SITE_KEY,
} from "@/config/constants";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_V3_SITE_KEY}>
          <NextThemesProvider {...themeProps}>
            <Toaster position="top-right" />
            {children}
          </NextThemesProvider>
        </GoogleReCaptchaProvider>
      </GoogleOAuthProvider>
    </HeroUIProvider>
  );
}
