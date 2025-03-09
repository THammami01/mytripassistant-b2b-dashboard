"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  updateAppBasicInformationFormSchema,
  UpdateAppBasicInformationFormType,
} from "./types";

import { useUser } from "@/contexts/user";
import { AppPlatformEnum } from "@/app/api/dashboard/create-app/types";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const app = user?.apps.find((app) => app.id === id)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<UpdateAppBasicInformationFormType>({
    mode: "all",
    resolver: zodResolver(updateAppBasicInformationFormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      platform: undefined,
    },
  });

  useEffect(() => {
    if (app) {
      reset({
        name: app.name,
        description: app.description,
        url: app.url,
        platform: app.platform as AppPlatformEnum,
      });
    }
  }, [app.platform]);

  const onSubmit = (data: UpdateAppBasicInformationFormType) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            classNames={{
              mainWrapper: "w-full",
            }}
            label="App Name"
            labelPlacement="outside"
            placeholder="Enter your app name"
            {...register("name")}
            description={errors?.name?.message}
          />

          <Select
            className="self-start"
            classNames={{
              mainWrapper: "w-full",
            }}
            label="App Platform"
            labelPlacement="outside"
            maxListboxHeight={300}
            placeholder="Select your app platform"
            onSelectionChange={(value) => {
              setValue("platform", value as unknown as AppPlatformEnum);
            }}
            {...register("platform")}
            description={errors?.platform?.message}
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
          </Select>

          <Textarea
            classNames={{
              mainWrapper: "w-full",
            }}
            label="App Description"
            labelPlacement="outside"
            placeholder="Enter your app description"
            {...register("description")}
            description={errors?.description?.message}
          />

          <Input
            classNames={{
              mainWrapper: "w-full",
            }}
            label="App URL"
            labelPlacement="outside"
            placeholder="Enter your app URL"
            {...register("url")}
            description={errors?.url?.message}
          />

          <Input
            isDisabled
            classNames={{
              mainWrapper: "w-full",
            }}
            label="App Logo"
            labelPlacement="outside"
            placeholder="Enter your app logo"
            type="file"
          />
        </div>

        <div className="flex w-full gap-2 mt-1">
          <Button
            color="success"
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
            radius="full"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
