"use client";

import React from "react";
import { Tabs, Tab, Button, Badge, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import CreateAppModal from "./CreateAppModal";

import { getFaviconFromWebsiteUrl } from "@/config/helpers";

const apps: any[] = [
  // {
  //   id: "82669756-b58d-4db1-8756-f7a15ff71004",
  //   name: "App 01",
  //   url: "https://mytripassistant.com",
  //   reviewStatus: "PENDING",
  // },
  // {
  //   id: "18024247-6d10-42cc-8cad-5186fc9604bf",
  //   name: "App 02",
  //   url: "http://app02.com",
  //   reviewStatus: "REJECTED",
  // },
  // {
  //   id: "94297250-2838-4e81-bd3e-a0832d2ce8a7",
  //   name: "App 03",
  //   url: "https://google.com",
  //   reviewStatus: "ACCEPTED",
  // },
  // {
  //   id: "82669756-b58d-4db1-8756-f7a15ff71004",
  //   name: "App 01",
  //   url: "https://mytripassistant.com",
  //   reviewStatus: "PENDING",
  // },
  // {
  //   id: "18024247-6d10-42cc-8cad-5186fc9604bf",
  //   name: "App 02",
  //   url: "http://app02.com",
  //   reviewStatus: "REJECTED",
  // },
  // {
  //   id: "94297250-2838-4e81-bd3e-a0832d2ce8a7",
  //   name: "App 03",
  //   url: "https://google.com",
  //   reviewStatus: "ACCEPTED",
  // },
  // {
  //   id: "82669756-b58d-4db1-8756-f7a15ff71004",
  //   name: "App 01",
  //   url: "https://mytripassistant.com",
  //   reviewStatus: "PENDING",
  // },
  // {
  //   id: "18024247-6d10-42cc-8cad-5186fc9604bf",
  //   name: "App 02",
  //   url: "http://app02.com",
  //   reviewStatus: "REJECTED",
  // },
  // {
  //   id: "94297250-2838-4e81-bd3e-a0832d2ce8a7",
  //   name: "App 03",
  //   url: "https://google.com",
  //   reviewStatus: "ACCEPTED",
  // },
  // {
  //   id: "82669756-b58d-4db1-8756-f7a15ff71004",
  //   name: "App 01",
  //   url: "https://mytripassistant.com",
  //   reviewStatus: "PENDING",
  // },
  // {
  //   id: "18024247-6d10-42cc-8cad-5186fc9604bf",
  //   name: "App 02",
  //   url: "http://app02.com",
  //   reviewStatus: "REJECTED",
  // },
  // {
  //   id: "94297250-2838-4e81-bd3e-a0832d2ce8a7",
  //   name: "App 03",
  //   url: "https://google.com",
  //   reviewStatus: "ACCEPTED",
  // },
];

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

  const selectedKey = pathname.split("/").pop();

  return (
    <div className="flex flex-col w-full gap-8 h-[calc(100vh-14rem)]">
      <div className="flex gap-4 h-[calc(100vh-14rem)]">
        <div className="flex flex-col w-1/4 gap-4">
          <Button
            className="w-full h-12 font-medium border-dashed text-success pr-0.5"
            color="default"
            variant="bordered"
            onPress={() => onCreateAppModalOpen()}
          >
            + Add a new app
          </Button>

          {apps.length ? (
            <Tabs
              fullWidth
              isVertical
              className="h-[calc(100vh-18rem)] overflow-y-auto pr-0.5"
              classNames={{
                cursor: "bg-content1 dark:bg-content1",
                panel: "w-full p-0 pt-4",
              }}
              selectedKey={selectedKey}
              onSelectionChange={(key) => router.push(`/dashboard/apps/${key}`)}
            >
              {apps.map((app, idx) => (
                <Tab
                  key={app.id + idx}
                  className="flex flex-col items-start justify-center w-full h-16 font-medium text-left"
                  title={
                    <>
                      <Badge
                        className="translate-x-5 translate-y-[0.15rem]"
                        color={
                          app.reviewStatus === "ACCEPTED"
                            ? "success"
                            : app.reviewStatus === "REJECTED"
                              ? "danger"
                              : "default"
                        }
                        content=""
                        placement="top-right"
                        size="sm"
                        variant="shadow"
                      >
                        <p
                          // className="ml-6 text-sm font-medium"
                          className="text-sm font-medium"
                          title={app.name}
                        >
                          {app.name}
                        </p>
                      </Badge>

                      <div className="flex items-center gap-1 mt-1.5">
                        <Image
                          alt={app.name}
                          height={20}
                          src={getFaviconFromWebsiteUrl(app.url)}
                          width={20}
                        />
                        <p className="text-sm text-default-500" title={app.url}>
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

        <div className="w-3/4">{children}</div>
      </div>

      <CreateAppModal
        isOpen={isCreateAppModalOpen}
        onClose={onCreateAppModalClose}
        onOpenChange={onCreateAppModalOpenChange}
      />
    </div>
  );
}
