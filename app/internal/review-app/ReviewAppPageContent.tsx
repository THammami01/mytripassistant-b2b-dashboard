"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Alert,
  Divider,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import ConfirmReviewModal from "./ConfirmReviewModal";

import { ThemeSwitch } from "@/components";
import { getFormattedDate } from "@/config/helpers";

export default function Component({
  app,
  reviewToken,
}: {
  app: any;
  reviewToken: string;
}) {
  const {
    isOpen: isConfirmReviewModalOpen,
    onOpen: onConfirmReviewModalOpen,
    onOpenChange: onConfirmReviewModalOpenChange,
    onClose: onConfirmReviewModalClose,
  } = useDisclosure();
  const [isReviewed, setIsReviewed] = useState(false);

  const [selectedAction, setSelectedAction] = useState<
    "accept" | "reject" | undefined
  >(undefined);

  const appCreatedAt = new Date(app.createdAt);
  const userUpdatedAt = new Date(
    app.user.updatedAt > app.user.company!.updatedAt
      ? app.user.updatedAt
      : app.user.company!.updatedAt
  );
  const isUserUpdatedAfterAppCreated = userUpdatedAt > appCreatedAt;

  return (
    <Card className="w-full max-w-[600px] mx-auto my-4 !min-h-[calc(100dvh-2rem)]">
      <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-green-300/10 via-green-350/15 to-green-400/20">
        <Image
          alt="MyTripAssistant Logo"
          className="w-20 h-20 translate-y-12 rounded-full"
          height={50}
          src="/logo192.png"
          width={50}
        />
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-col items-center gap-3 pt-10">
          <p className="text-[1.2rem] font-medium">App Review Request</p>

          <p className="">
            MyTripAssistant{" "}
            <span className="text-gray-400">| B2B Dashboard</span>
          </p>
        </div>

        <div className="px-2 py-4 mt-3">
          {app.pendingAppsFromAllUsersCount - 1 > 0 && (
            <Alert
              className="mb-6"
              color="warning"
              title={`You have ${app.pendingAppsFromAllUsersCount - 1} other review request${
                app.pendingAppsFromAllUsersCount - 1 === 1 ? "" : "s"
              } pending.`}
              variant="faded"
            />
          )}

          {isReviewed && (
            <div className="flex flex-col w-full gap-3">
              <p className="text-center text-default-500">
                This app with ID <span className="font-medium">{app.id}</span>{" "}
                has been reviewed and{" "}
                {selectedAction === "accept" ? "accepted" : "rejected"}.
              </p>
            </div>
          )}

          {!isReviewed && (
            <>
              <div className="flex flex-col w-full gap-3">
                <div>
                  <p className="mb-2 font-medium">App Details:</p>
                  <p>
                    - ID: <span className="text-default-500">{app.id}</span>
                  </p>
                  <p>
                    - Name: <span className="text-default-500">{app.name}</span>
                  </p>
                  <p>
                    - Description:{" "}
                    <span className="text-default-500">{app.description}</span>
                  </p>
                  <p>
                    - URL: <span className="text-default-500">{app.url}</span>
                  </p>
                  <p>
                    - Platform:{" "}
                    <span className="text-default-500">{app.platform}</span>
                  </p>
                  <p>
                    - Created At:{" "}
                    <span className="text-default-500">
                      {getFormattedDate(app.createdAt)}
                    </span>
                  </p>
                </div>

                <Divider className="my-2" />

                <div>
                  <p className="mb-2 font-medium">User and Company Details:</p>
                  <Alert
                    className="mt-2 mb-3 text-default-500"
                    color="default"
                    title={
                      isUserUpdatedAfterAppCreated
                        ? "The details below are up-to-date, yet they may differ from the details stated in the email as the user has updated their information since the request."
                        : "The details below are up-to-date."
                    }
                    variant="faded"
                  />
                  <p>
                    - ID:{" "}
                    <span className="text-default-500">{app.user.id}</span>
                  </p>
                  <p>
                    - Email:{" "}
                    <span className="text-default-500">{app.user.email}</span>
                  </p>
                  <p>
                    - First Name:{" "}
                    <span className="text-default-500">
                      {app.user.firstName}
                    </span>
                  </p>
                  <p>
                    - Last Name:{" "}
                    <span className="text-default-500">
                      {app.user.lastName}
                    </span>
                  </p>
                  <p>
                    - Company:{" "}
                    <span className="text-default-500">
                      {app.user.company?.name}
                    </span>
                  </p>
                  <p>
                    - Address:{" "}
                    <span className="text-default-500">
                      {app.user.company?.address}
                    </span>
                  </p>
                  <p>
                    - State:{" "}
                    <span className="text-default-500">
                      {app.user.company?.state}
                    </span>
                  </p>
                  <p>
                    - Zip Code:{" "}
                    <span className="text-default-500">
                      {app.user.company?.zipCode}
                    </span>
                  </p>
                  <p>
                    - Country:{" "}
                    <span className="text-default-500">
                      {app.user.company?.country}
                    </span>
                  </p>
                  <p>
                    - Phone Number:{" "}
                    <span className="text-default-500">
                      {app.user.company?.phoneNumber}
                    </span>
                  </p>
                  <p>
                    - Website:{" "}
                    <span className="text-default-500">
                      {app.user.company?.website}
                    </span>
                  </p>
                  <p>
                    - Created At:{" "}
                    <span className="text-default-500">
                      {getFormattedDate(app.user.createdAt)}
                    </span>
                  </p>
                  <p>
                    - Updated At:{" "}
                    <span className="text-default-500">
                      {getFormattedDate(
                        app.user.updatedAt > app.user.company!.updatedAt
                          ? app.user.updatedAt
                          : app.user.company!.updatedAt
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <Divider className="my-6" />
              <div className="flex w-full gap-2 max-w-[400px] mx-auto">
                <Button
                  fullWidth
                  color="success"
                  size="lg"
                  onPress={() => {
                    setSelectedAction("accept");
                    onConfirmReviewModalOpen();
                  }}
                >
                  Accept
                </Button>
                <Button
                  fullWidth
                  color="danger"
                  size="lg"
                  onPress={() => {
                    setSelectedAction("reject");
                    onConfirmReviewModalOpen();
                  }}
                >
                  Reject
                </Button>
              </div>
            </>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-center justify-center gap-4 pb-5">
        <div className="flex items-center gap-1">
          <Icon
            className="text-default-400"
            icon="solar:info-circle-bold"
            width={20}
          />
          <p className="text-small text-default-400">
            This link will expire after review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm text-default-400">Switch theme?</p>
          <ThemeSwitch />
        </div>
      </CardFooter>

      <ConfirmReviewModal
        action={selectedAction}
        appId={app.id}
        isOpen={isConfirmReviewModalOpen}
        reviewToken={reviewToken}
        setIsReviewed={setIsReviewed}
        onClose={onConfirmReviewModalClose}
        onOpenChange={onConfirmReviewModalOpenChange}
      />
    </Card>
  );
}
