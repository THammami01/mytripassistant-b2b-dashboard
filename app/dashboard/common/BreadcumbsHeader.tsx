"use client";

import { Breadcrumbs, BreadcrumbItem, cn } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/user";

export default function BreadcumbsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const pathnames = pathname.split("/").filter((item) => item);

  const getItemName = (name: string, index: number) => {
    if (index === 2 && pathname.startsWith("/dashboard/apps/"))
      return user?.apps?.find((app) => app.id === name)?.name ?? 'Create a new app';

    return name.replace(/-/g, " ");
  };

  return (
    <Breadcrumbs
      itemClasses={{
        item: "text-xl",
        separator: "text-xl",
      }}
    >
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
