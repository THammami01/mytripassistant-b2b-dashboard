"use client";

import React from "react";
import { toast } from "react-hot-toast";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Button,
  Divider,
} from "@heroui/react";

import { AppReviewStatus } from "./types";

import InternalService from "@/services/internal";

export default function ConfirmReviewModal({
  isOpen,
  onOpenChange,
  onClose,
  action,
  appId,
  reviewToken,
  setIsReviewed,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  action?: "accept" | "reject";
  appId: string;
  reviewToken: string;
  setIsReviewed: (isReviewed: boolean) => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    await InternalService.reviewApp({
      appId,
      reviewToken,
      reviewStatus:
        action === "accept"
          ? AppReviewStatus.ACCEPTED
          : AppReviewStatus.REJECTED,
    })
      .then((_res) => {
        toast.success("App reviewed successfully.");
        setIsReviewed(true);
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
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      shouldBlockScroll={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
              <h1 className="text-xl">Confirm Review</h1>
              <p className="mt-3 font-normal text-small text-default-500">
                Are you sure you want to{" "}
                <span className="font-bold uppercase text-default-700">
                  {action === "accept" ? "accept" : "reject"}
                </span>{" "}
                this app?
              </p>
            </ModalHeader>

            <Divider className="my-2" />

            <div className="flex items-center justify-between w-full pb-4">
              <div className="flex items-center justify-center w-full gap-2">
                <Button
                  color="danger"
                  type="button"
                  variant="flat"
                  onPress={onClose}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  color={action === "accept" ? "success" : "danger"}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  className="w-full"
                >
                  {action === "accept" ? "Accept" : "Reject"}
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
