"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = pathname.split("/").pop();

  return (
    <div className="flex flex-col w-full max-w-2xl gap-4">
      <h2 className="text-small text-default-500">
        Customize settings, email preferences, and web appearance.
      </h2>

      <Tabs
        fullWidth
        classNames={{
          base: "mt-6",
          cursor: "bg-content1 dark:bg-content1",
          panel: "w-full p-0 pt-4",
        }}
        selectedKey={selectedKey}
        onSelectionChange={(key) => router.push(`/dashboard/settings/${key}`)}
      >
        <Tab key="basic-information" title="Basic Information" />
        <Tab key="login-information" title="Login Information" />
        <Tab key="appearance" title="Appearance" />
      </Tabs>
      {children}
    </div>
  );
}
