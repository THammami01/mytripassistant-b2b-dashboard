import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Button,
  Divider,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AppPlatformEnum,
  createAppFormSchema,
  CreateAppFormType,
} from "./types";

import DashboardService from "@/services/dashboard";
import { useUser } from "@/contexts/user";

export default function CreateAppModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<CreateAppFormType>({
    mode: "all",
    resolver: zodResolver(createAppFormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      platform: AppPlatformEnum.WEB,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser, user } = useUser();

  const onSubmit = (data: CreateAppFormType) => {
    setIsLoading(true);

    DashboardService.createApp(data)
      .then((res) => {
        toast.success(
          "App details submitted successfully. We will review your request and get back to you soon.",
          {
            duration: 10000,
          }
        );
        reset();
        setUser({
          ...user!,
          apps: [...user!.apps, res.app],
        });
        onClose();
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      shouldBlockScroll={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
              <h1 className="text-xl">Create a new app</h1>
              <p className="mt-3 font-normal text-small text-default-500">
                Create a new app to integrate MyTripAssistant.
              </p>
            </ModalHeader>
            <form
              className="flex flex-col w-full gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* App Name */}
              <Input
                isRequired
                description={errors?.name?.message}
                label="App Name"
                placeholder="e.g. MyTripAssistant"
                variant="flat"
                {...register("name")}
              />

              {/* App Platform */}
              <Select
                isRequired
                description={errors?.platform?.message}
                label="App Platform"
                maxListboxHeight={300}
                placeholder="Select your app platform"
                variant="flat"
                {...register("platform")}
                onSelectionChange={(value) => {
                  setValue("platform", value as unknown as AppPlatformEnum);
                }}
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
                  startContent={
                    <Icon height="24" icon="raphael:ios" width="24" />
                  }
                >
                  iOS
                </SelectItem>
                <SelectItem
                  key={AppPlatformEnum.ANDROID}
                  startContent={
                    <Icon height="24" icon="mdi:android" width="24" />
                  }
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
                    <Icon
                      height="24"
                      icon="mage:microsoft-windows"
                      width="24"
                    />
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

              {/* App URL */}
              <Input
                isRequired
                description={errors?.url?.message}
                label="App URL"
                placeholder="e.g. https://mytripassistant.com"
                variant="flat"
                {...register("url")}
              />

              {/* App Description */}
              <Textarea
                isRequired
                description={errors?.description?.message}
                label="App Description"
                placeholder="Describe your app in a few words"
                variant="flat"
                {...register("description")}
              />

              <Divider className="my-2" />
              <div className="flex items-center justify-between w-full pb-4">
                <div className="flex justify-end w-full gap-2">
                  <Button
                    color="danger"
                    type="button"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    isDisabled={!isValid || isLoading}
                    isLoading={isLoading}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
