"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { useUser } from "@/contexts/user";
import { AppPlatformEnum } from "@/app/api/dashboard/create-app/types";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const app = user?.apps.find((app) => app.id === id)!;

  const [appPlatform, setAppPlatform] = useState<AppPlatformEnum>();

  useEffect(() => {
    setAppPlatform(app.platform as AppPlatformEnum);
  }, [app]);

  return (
    <div className="flex flex-col gap-6 px-2">
      <div>
        <p className="text-base font-medium text-default-700">
          Basic Information
        </p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage the basic information of this app.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[500px]">
        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App Name"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your app name"
          value={app.name}
          variant="bordered"
        />

        {/* <Select
          classNames={{
            label: "w-36",
            mainWrapper: "w-full",
          }}
          label="App Platform"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          maxListboxHeight={300}
          placeholder="Select your app platform"
          value={appPlatform}
          variant="bordered"
          onSelectionChange={(value) => {
            setAppPlatform(value as unknown as AppPlatformEnum);
          }}
          // description={errors?.platform?.message}
        >
          <SelectItem
            key={AppPlatformEnum.WEB}
            startContent={<Icon height="24" icon="mdi:web" width="24" />}
          >
            Web
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.CROSS_PLATFORM}
            startContent={
              <Icon height="24" icon="garden:platform-26" width="24" />
            }
          >
            Cross-Platform
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.IOS}
            startContent={<Icon height="24" icon="raphael:ios" width="24" />}
          >
            iOS
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.ANDROID}
            startContent={<Icon height="24" icon="mdi:android" width="24" />}
          >
            Android
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.MACOS}
            startContent={
              <Icon height="24" icon="simple-icons:macos" width="24" />
            }
          >
            macOS
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.WINDOWS}
            startContent={
              <Icon height="24" icon="mage:microsoft-windows" width="24" />
            }
          >
            Windows
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.LINUX}
            startContent={
              <Icon height="24" icon="simple-icons:linux" width="24" />
            }
          >
            Linux
          </SelectItem>
          <SelectItem
            key={AppPlatformEnum.OTHER}
            startContent={
              <Icon height="24" icon="basil:other-1-outline" width="24" />
            }
          >
            Other
          </SelectItem>
        </Select> */}

        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App Platform"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Select your app platform"
          value={appPlatform}
          variant="bordered"
        />

        <Textarea
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App Description"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your app description"
          value={app.description}
          variant="bordered"
        />

        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App URL"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your app URL"
          value={app.url}
          variant="bordered"
        />

        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App Logo"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your app logo"
          type="file"
          variant="bordered"
        />

        <div className="flex w-full gap-2 mt-3">
          <Button
            color="success"
            // isDisabled={!isValid || isLoading}
            // isLoading={isLoading}
            radius="full"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
