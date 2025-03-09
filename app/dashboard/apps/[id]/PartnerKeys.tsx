"use client";

import { Button, Input, Link } from "@heroui/react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { useUser } from "@/contexts/user";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isGetYourGuideAPIKeyVisible, setIsGetYourGuideAPIKeyVisible] =
    useState(false);
  const [isTravelpayoutsAPIKeyVisible, setIsTravelpayoutsAPIKeyVisible] =
    useState(false);

  const _app = user?.apps.find((app) => app.id === id)!;

  const toggleGetYourGuideAPIKeyVisibility = () => {
    setIsGetYourGuideAPIKeyVisible(!isGetYourGuideAPIKeyVisible);
  };

  const toggleTravelpayoutsAPIKeyVisibility = () => {
    setIsTravelpayoutsAPIKeyVisible(!isTravelpayoutsAPIKeyVisible);
  };

  return (
    <div className="flex flex-col gap-6 px-2">
      <div>
        <p className="text-base font-medium text-default-700">Partner Keys</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Add and manage your third party partner keys.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[500px]">
        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          endContent={
            <button type="button" onClick={toggleGetYourGuideAPIKeyVisibility}>
              {isGetYourGuideAPIKeyVisible ? (
                <Icon
                  className="text-2xl pointer-events-none text-default-400"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="text-2xl pointer-events-none text-default-400"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="GetYourGuide"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your GetYourGuide API key"
          type={isGetYourGuideAPIKeyVisible ? "text" : "password"}
          // value={app.name}
          variant="bordered"
        />

        <Link
          isExternal
          showAnchorIcon
          className="mx-0.5 -mt-1 text-sm w-fit"
          color="foreground"
          href="https://integrator.getyourguide.com/"
          target="_blank"
        >
          GetYourGuide API Documentation
        </Link>

        <Input
          classNames={{
            label: "w-36 -ml-1.5",
            mainWrapper: "w-full",
          }}
          endContent={
            <button type="button" onClick={toggleTravelpayoutsAPIKeyVisibility}>
              {isTravelpayoutsAPIKeyVisible ? (
                <Icon
                  className="text-2xl pointer-events-none text-default-400"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="text-2xl pointer-events-none text-default-400"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="Travelpayouts"
          labelPlacement={isMobile ? "outside" : "outside-left"}
          placeholder="Enter your Travelpayouts API key"
          type={isTravelpayoutsAPIKeyVisible ? "text" : "password"}
          // value={app.platform}
          variant="bordered"
        />

        <Link
          isExternal
          showAnchorIcon
          className="mx-0.5-mt-1 text-sm w-fit"
          color="foreground"
          href="https://travelpayouts-data-api.readthedocs.io/"
          target="_blank"
        >
          Travelpayouts API Documentation
        </Link>

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
