"use client";

import { Breadcrumbs, BreadcrumbItem, cn } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import sidebarItems from "./sidebar-items";

export default function BreadcumbsHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((item) => item);

  const getItemName = (name: string, index: number) => {
    if (index === 2 && pathname.startsWith("/dashboard/apps/")) {
      return sidebarItems
        .find((item) => item.key === "your-apps")
        ?.items?.find((item) => item.key.endsWith(name))?.title;
    }

    return name;
  };

  return (
    <Breadcrumbs size="lg">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <BreadcrumbItem
            key={name}
            className={cn("capitalize", {
              "!text-grey-500": index === 0,
            })}
            isCurrent={index === pathnames.length - 1}
            isDisabled={index === 0}
            onPress={() => router.push(routeTo)}
          >
            {getItemName(name, index)}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
