import { Icon } from "@iconify/react";

import { type SidebarItem } from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const sectionItems: SidebarItem[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    items: [
      {
        key: "home",
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "apps",
        href: "#",
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
        key: "performance",
        href: "#",
        icon: "solar:chart-outline",
        title: "Performance",
      },
      {
        key: "settings",
        href: "/settings",
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
        key: "app-01",
        href: "#",
        title: "App 01",
        startContent: <TeamAvatar name="App 01" />,
      },
      {
        key: "app-02",
        href: "#",
        title: "App 02",
        startContent: <TeamAvatar name="App 02" />,
      },
      {
        key: "app-03",
        href: "#",
        title: "App 03",
        startContent: <TeamAvatar name="App 03" />,
      },
    ],
  },
];
