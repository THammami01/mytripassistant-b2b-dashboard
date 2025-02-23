"use client";

import { Tabs, Tab } from "@heroui/react";

export default function Page() {
  return (
    <div>
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
      >
        <Tab key="profile" title="Profile" />
        <Tab key="appearance" title="Appearance" />
        <Tab key="account" title="Account" />
        <Tab key="billing" title="Billing" />
        <Tab key="team" title="Team" />
      </Tabs>
    </div>
  );
}
