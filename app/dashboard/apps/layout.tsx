"use client";

import React from "react";
import { Tabs, Tab, Button, Badge, useDisclosure, cn } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AppReviewStatus } from "@prisma/client";

import CreateAppModal from "./CreateAppModal";

import { getFaviconFromWebsiteUrl } from "@/config/helpers";
import { useUser } from "@/contexts/user";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isOpen: isCreateAppModalOpen,
    onOpen: onCreateAppModalOpen,
    onOpenChange: onCreateAppModalOpenChange,
    onClose: onCreateAppModalClose,
  } = useDisclosure();
  const { user } = useUser();

  const selectedKey = pathname.split("/").pop();

  return (
    <div className="flex flex-col w-full gap-8 mb-4 md:mb-0">
      <h2 className="text-small text-default-500">
        Create and manage your apps.
      </h2>

      <div className="flex flex-col md:flex-row gap-4 md:h-[calc(100vh-12rem)]">
        <div className="flex flex-col w-full gap-4 md:w-1/4 md:flex-col">
          <Button
            className="w-full h-12 font-medium border-dashed text-success pr-0.5"
            color="default"
            isDisabled={!user?.company?.name}
            title={
              !user?.company?.name
                ? "Fill your basic info to be able to add an app"
                : ""
            }
            variant="bordered"
            onPress={() => onCreateAppModalOpen()}
          >
            + Add a new app
          </Button>

          {user?.apps.length ? (
            <Tabs
              fullWidth
              isVertical
              className="md:h-[calc(100vh-18rem)] overflow-y-auto pr-0.5"
              classNames={{
                cursor: "bg-content1 dark:bg-content1",
                panel: "w-full p-0 pt-4",
              }}
              selectedKey={selectedKey}
              onSelectionChange={(key) => router.push(`/dashboard/apps/${key}`)}
            >
              {user?.apps
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((app) => (
                  <Tab
                    key={app.id}
                    className={cn(
                      "flex flex-col items-start justify-center w-full h-16 font-medium text-left",
                      {
                        "cursor-default": app.id === selectedKey,
                      }
                    )}
                    title={
                      <>
                        <Badge
                          className="translate-x-6 translate-y-[0.15rem]"
                          color={
                            app.reviewStatus === AppReviewStatus.ACCEPTED
                              ? "success"
                              : app.reviewStatus === AppReviewStatus.REJECTED
                                ? "danger"
                                : "default"
                          }
                          content=""
                          placement="top-right"
                          size="sm"
                          variant="shadow"
                        >
                          <p className="text-sm font-medium" title={app.name}>
                            {app.name}
                          </p>
                        </Badge>

                        <div className="flex items-center gap-1 mt-1.5">
                          <Image
                            alt={app.name}
                            height={20}
                            src={getFaviconFromWebsiteUrl(app.url)}
                            width={20}
                            onError={(event) => {
                              const img = event.target as HTMLImageElement;

                              img.id =
                                "https://res.cloudinary.com/dgihbgsnz/image/upload/v1740901786/mytripassistant/app-favicon-placeholder-02_nktzmy.svg";
                              img.srcset =
                                "https://res.cloudinary.com/dgihbgsnz/image/upload/v1740901786/mytripassistant/app-favicon-placeholder-02_nktzmy.svg";
                            }}
                          />
                          <p
                            className="w-[14rem] truncate text-sm text-default-500"
                            title={app.url}
                          >
                            {app.url}
                          </p>
                        </div>
                      </>
                    }
                  />
                ))}
            </Tabs>
          ) : (
            <p className="w-full mt-4 text-sm font-medium text-center text-default-400">
              No apps found
            </p>
          )}
        </div>

        <div className="w-full md:w-3/4">{children}</div>
      </div>

      <CreateAppModal
        isOpen={isCreateAppModalOpen}
        onClose={onCreateAppModalClose}
        onOpenChange={onCreateAppModalOpenChange}
      />
    </div>
  );
}
