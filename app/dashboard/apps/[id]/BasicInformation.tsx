"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { useUser } from "@/contexts/user";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const app = user?.apps.find((app) => app.id === id)!;

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

        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          label="App Platform"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your app platform"
          value={app.platform}
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
