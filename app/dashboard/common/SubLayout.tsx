"use client";

import React, { PropsWithChildren } from "react";
import {
  ScrollShadow,
  Button,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// import ProfileSetting from "./profile-setting";
// import AppearanceSetting from "./appearance-setting";
// import AccountSetting from "./account-setting";
// import BillingSetting from "./billing-setting";
// import TeamSetting from "./team-setting";
import SidebarDrawer from "./SidebarDrawer";
import Sidebar from "./Sidebar";
import sidebarItems from "./sidebar-items";
import BreadcumbsHeader from "./BreadcumbsHeader";
import TeamAvatar from "./TeamAvatar";

import ThemeSwitch from "@/components/ThemeSwitch";
import { AuthService } from "@/services";
import { useUser } from "@/contexts/user";

export default function SubLayout({ children }: PropsWithChildren) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

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

  const name =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : "";

  return (
    <div className="flex w-full gap-4 h-dvh">
      {/* Sidebar */}
      <SidebarDrawer
        className={cn("min-w-[288px] rounded-lg", {
          "min-w-[76px]": isCollapsed,
        })}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div
          className={cn(
            "will-change relative flex h-full w-72 flex-col bg-default-100 p-6 transition-width",
            {
              "w-[83px] items-center px-[6px] py-6": isCollapsed,
            }
          )}
        >
          <div
            className={cn("flex items-center gap-3 pl-2", {
              "justify-center gap-0 pl-0": isCollapsed,
            })}
          >
            <div className="flex items-center justify-center h-9 w-9 min-w-9">
              <Image alt="logo" height={36} src="/logo192.png" width={36} />
            </div>
            <span
              className={cn("w-full text-base font-medium opacity-100", {
                "w-0 opacity-0": isCollapsed,
              })}
            >
              MyTripAssistant
              <br />
              <span className="text-sm font-medium text-gray-500">
                B2B Dashboard
              </span>
            </span>
            <div className={cn("flex-end flex", { hidden: isCollapsed })}>
              <Icon
                className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                icon="solar:round-alt-arrow-left-line-duotone"
                width={24}
                onClick={isMobile ? onOpenChange : onToggle}
              />
            </div>
          </div>
          <Spacer y={6} />
          <div className="flex items-center gap-3 px-3">
            {/* <Avatar
              isBordered
              size="sm"
              // name={name}
            /> */}
            <TeamAvatar isBordered name={name} />
            <div
              className={cn("flex max-w-full flex-col", {
                hidden: isCollapsed,
              })}
            >
              <p
                className="w-[10rem] truncate font-medium text-small text-foreground"
                title={name || user?.email}
              >
                {name || user?.email}
              </p>
              <p className="font-medium text-tiny text-default-400">Admin</p>
            </div>
          </div>

          <Spacer y={6} />

          <Sidebar
            defaultSelectedKey="home"
            iconClassName="group-data-[selected=true]:text-default-50"
            isCompact={isCollapsed}
            itemClasses={{
              base: "px-3 rounded-large data-[selected=true]:!bg-foreground",
              title: "group-data-[selected=true]:text-default-50",
            }}
            items={sidebarItems}
            selectedKeys={[pathname]}
          />

          <Spacer y={8} />

          <div
            className={cn("mt-auto flex flex-col", {
              "items-center": isCollapsed,
            })}
          >
            {isCollapsed && (
              <Button
                isIconOnly
                className="flex w-10 h-10 text-default-600"
                size="sm"
                variant="light"
              >
                <Icon
                  className="cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px]"
                  height={24}
                  icon="solar:round-alt-arrow-right-line-duotone"
                  width={24}
                  onClick={onToggle}
                />
              </Button>
            )}
            <div className="flex items-center gap-2 mx-2 my-4">
              {!isCollapsed && (
                <p className="text-sm text-gray-400">Switch theme?</p>
              )}
              <ThemeSwitch />
            </div>

            <Tooltip
              content="Help & Information"
              isDisabled={!isCollapsed}
              placement="right"
            >
              <Button
                fullWidth
                className={cn(
                  "justify-start truncate text-default-600 data-[hover=true]:text-foreground",
                  {
                    "justify-center": isCollapsed,
                  }
                )}
                isIconOnly={isCollapsed}
                startContent={
                  isCollapsed ? null : (
                    <Icon
                      className="flex-none text-default-600"
                      icon="solar:info-circle-line-duotone"
                      width={24}
                    />
                  )
                }
                variant="light"
                onPress={() =>
                  window.open("https://docs.b2b.mytripassistant.com", "_blank")
                }
              >
                {isCollapsed ? (
                  <Icon
                    className="text-default-500"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                ) : (
                  "Help & Information"
                )}
              </Button>
            </Tooltip>
            <Tooltip
              content="Log Out"
              isDisabled={!isCollapsed}
              placement="right"
            >
              <Button
                className={cn(
                  "justify-start text-default-500 data-[hover=true]:text-foreground",
                  {
                    "justify-center": isCollapsed,
                  }
                )}
                isIconOnly={isCollapsed}
                startContent={
                  isCollapsed ? null : (
                    <Icon
                      className="flex-none rotate-180 text-default-500"
                      icon="solar:minus-circle-line-duotone"
                      width={24}
                    />
                  )
                }
                variant="light"
                isDisabled={isLoading}
                isLoading={isLoading}
                onPress={() => handleLogout()}
              >
                {isCollapsed ? (
                  <Icon
                    className="rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                ) : (
                  "Log Out"
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </SidebarDrawer>

      {/*  Settings Content */}
      <ScrollShadow className="w-full h-full">
        <div className="flex-1 w-full p-4">
          {/* Title */}
          <div className="flex items-center mt-4 gap-x-3">
            <Button
              isIconOnly
              className="sm:hidden"
              size="sm"
              variant="flat"
              onPress={() => {
                setIsCollapsed(false);
                onOpenChange();
              }}
            >
              <Icon
                className="text-default-500"
                icon="solar:sidebar-minimalistic-linear"
                width={20}
              />
            </Button>

            <BreadcumbsHeader />
          </div>
        </div>

        <div className="p-4">{children}</div>
      </ScrollShadow>
    </div>
  );
}
