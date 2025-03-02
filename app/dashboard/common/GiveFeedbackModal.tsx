"use client";

import React from "react";
import {
  Button,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import FeedbackRatingItem, { RatingValueEnum } from "./FeedbackRatingItem";
import { giveFeedbackFormSchema, GiveFeedbackFormType } from "./types";

import DashboardService from "@/services/dashboard";

export default function GiveFeedbackModal({
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
    watch,
    setValue,
    reset,
  } = useForm<GiveFeedbackFormType>({
    mode: "all",
    resolver: zodResolver(giveFeedbackFormSchema),
    defaultValues: {
      content: "",
      rating: RatingValueEnum.GOOD,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (data: GiveFeedbackFormType) => {
    setIsLoading(true);

    DashboardService.giveFeedback(data)
      .then(() => {
        toast.success("Feedback submitted successfully.");
        reset();
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
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isDismissable={false}
      isOpen={isOpen}
      shouldBlockScroll={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
              <h1 className="text-xl">Help us improve MyTripAssistant</h1>
              <p className="mt-3 font-normal text-small text-default-500">
                We value your feedback. If you have any ideas or suggestions to
                improve our product, please let us know.
              </p>
            </ModalHeader>
            <form
              className="flex flex-col w-full gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Textarea
                aria-label="Feedback"
                description={errors?.content?.message}
                minRows={8}
                placeholder="Ideas or suggestions to improve our product"
                variant="faded"
                {...register("content")}
              />
              <div className="flex items-center justify-end w-full gap-2 px-1 mt-1">
                <Icon
                  className="text-default-400 dark:text-default-300"
                  icon="la:markdown"
                  width={20}
                />
                <p className="text-tiny text-default-400 dark:text-default-300">
                  <Link
                    className="text-tiny text-default-500"
                    color="foreground"
                    href="https://guides.github.com/features/mastering-markdown/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Markdown
                    <Icon
                      className="[&>path]:stroke-[2px]"
                      icon="solar:arrow-right-up-linear"
                    />
                  </Link>
                  &nbsp;supported.
                </p>
              </div>
              <Divider className="my-2" />
              <div className="flex items-center justify-between w-full pb-4">
                <RadioGroup
                  classNames={{
                    base: "max-w-fit",
                    wrapper: "gap-3",
                  }}
                  defaultValue={RatingValueEnum.GOOD}
                  description={errors?.rating?.message}
                  orientation="horizontal"
                  size="lg"
                  value={watch("rating")}
                  onValueChange={(value) =>
                    setValue("rating", value as RatingValueEnum)
                  }
                >
                  <FeedbackRatingItem value={RatingValueEnum.BAD} />
                  <FeedbackRatingItem value={RatingValueEnum.NEUTRAL} />
                  <FeedbackRatingItem value={RatingValueEnum.GOOD} />
                  <FeedbackRatingItem value={RatingValueEnum.GREAT} />
                </RadioGroup>

                <div className="flex gap-2">
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
