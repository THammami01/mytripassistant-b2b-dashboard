"use client";

import React from "react";
import { Divider, User } from "@heroui/react";
import Image from "next/image";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { GOOGLE_RECAPTCHA_V3_SITE_KEY } from "@/config/public-constants";
import { ThemeSwitch } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_V3_SITE_KEY}>
      <div className="relative flex w-full h-full min-h-screen">
        {/* Brand Logo */}
        <div className="absolute left-2 top-5 lg:left-5">
          <div className="flex items-center">
            <Image alt="logo" height={40} src="/logo192.png" width={40} />
            <p className="font-medium">
              MyTripAssistant{" "}
              <span className="text-gray-400">| B2B Dashboard</span>
            </p>
          </div>
          <Divider className="flex-1 mt-3 mb-2" />
          <div className="flex items-center gap-2 mx-4">
            <p className="text-sm text-gray-400">Switch theme?</p>
            <ThemeSwitch />
          </div>
        </div>

        {/* Forms */}
        {children}

        {/* Right side */}
        <div
          className="relative flex-col-reverse hidden w-1/2 p-10 rounded-medium shadow-small lg:flex"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dgihbgsnz/image/upload/v1740195703/mytripassistant/mytripassistant-auth-module-bg_hotxl4.avif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-end gap-4 mb-12">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
              }}
              classNames={{
                base: "flex flex-row-reverse",
                name: "w-full text-right text-white",
                description: "text-white/80",
              }}
              description="Founder & CEO at ACME"
              name="Bruno Reichert"
            />
            <p className="w-full text-2xl text-right text-white/90">
              <span className="font-medium">“</span>
              <span className="italic font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                eget augue nec massa volutpat aliquet.
              </span>
              <span className="font-medium">”</span>
            </p>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
