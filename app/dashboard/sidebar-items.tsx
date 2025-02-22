"use client";

import { Icon } from "@iconify/react";

import { type SidebarItem } from "./sidebar";
import TeamAvatar from "./team-avatar";

export const sectionItems: SidebarItem[] = [
  {
    key: "/dashboard",
    title: "Dashboard",
    items: [
      {
        key: "/dashboard/home",
        href: "/dashboard/home",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "/dashboard/apps",
        href: "/dashboard/apps",
        icon: "solar:widget-2-outline",
        title: "Apps",
        endContent: (
          <Icon
            className="text-default-400"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "/dashboard/performance",
        href: "/dashboard/performance",
        icon: "solar:chart-outline",
        title: "Performance",
      },
      {
        key: "/dashboard/settings",
        href: "/dashboard/settings",
        icon: "solar:settings-outline",
        title: "Settings",
      },
    ],
  },
];

export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems,
  {
    key: "your-apps",
    title: "Your Apps",
    items: [
      {
        key: "/dashboard/apps/82669756-b58d-4db1-8756-f7a15ff71004",
        href: "/dashboard/apps/82669756-b58d-4db1-8756-f7a15ff71004",
        title: "App 01",
        startContent: <TeamAvatar name="App 01" />,
      },
      {
        key: "/dashboard/apps/18024247-6d10-42cc-8cad-5186fc9604bf",
        href: "/dashboard/apps/18024247-6d10-42cc-8cad-5186fc9604bf",
        title: "App 02",
        startContent: <TeamAvatar name="App 02" />,
      },
      {
        key: "/dashboard/apps/94297250-2838-4e81-bd3e-a0832d2ce8a7",
        href: "/dashboard/apps/94297250-2838-4e81-bd3e-a0832d2ce8a7",
        title: "App 03",
        startContent: <TeamAvatar name="App 03" />,
      },
    ],
  },
];
