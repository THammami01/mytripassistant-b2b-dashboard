"use client";

import React from "react";
import { Button, ScrollShadow, Spacer, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SidebarDrawer from "./sidebar-drawer";
import { sectionItemsWithTeams } from "./sidebar-items";
import Sidebar from "./sidebar";
import TeamAvatar from "./team-avatar";

import { AuthService } from "@/services";
import { useUser } from "@/contexts/user";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function Component() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      router.push("/auth/sign-in");
    }
  };

  const content = (
    <div className="relative flex flex-col flex-1 h-full p-6 w-72">
      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full">
          <Image alt="logo" height={40} src="/logo192.png" width={40} />
        </div>
        <span className="font-medium text-md text-foreground">
          MyTripAssistant B2B
        </span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <TeamAvatar isBordered name={`${user?.firstName} ${user?.lastName}`} />
        <div className="flex flex-col">
          <p className="font-medium text-small text-default-600">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-tiny text-default-400">Admin</p>
        </div>
      </div>

      <Spacer y={8} />

      <ScrollShadow className="h-full max-h-full py-6 pr-6 -mr-6">
        <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} />
      </ScrollShadow>

      <Spacer y={8} />
      <div className="flex flex-col mt-auto">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="text-default-500"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          isDisabled={isLoading}
          isLoading={isLoading}
          startContent={
            <Icon
              className="rotate-180 text-default-500"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
          onPress={() => handleLogout()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-dvh">
      <SidebarDrawer
        className=" !border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex-col flex-1 w-full p-4">
        <header className="flex items-center h-16 gap-2 px-4 rounded-medium border-small border-divider">
          <Button
            isIconOnly
            className="flex sm:hidden"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          <h2 className="font-medium text-medium text-default-700">Dashboard</h2>
        </header>
        <main className="w-full h-full mt-4 overflow-visible">
          <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider" />
        </main>
      </div>
    </div>
  );
}
