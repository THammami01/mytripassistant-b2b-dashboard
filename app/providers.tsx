"use client";

import type { ThemeProviderProps } from "next-themes";

import React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import { GOOGLE_CLIENT_ID } from "@/config/public-constants";
import { PostHogProvider } from "@/components";

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
      <PostHogProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <NextThemesProvider {...themeProps}>
            <Toaster position="top-right" />
            {children}
          </NextThemesProvider>
        </GoogleOAuthProvider>
      </PostHogProvider>
    </HeroUIProvider>
  );
}
