"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Input, Tabs, Tab, Code, ScrollShadow, Chip } from "@heroui/react";
import { useParams } from "next/navigation";

import { CopyText } from "../../performance/CopyText";

import BasicInformation from "./BasicInformation";
import PartnerKeys from "./PartnerKeys";
import Usage from "./Usage";
import Settings from "./Settings";

import { getFaviconFromWebsiteUrl } from "@/config/helpers";
import { useUser } from "@/contexts/user";

export default function AppTabs() {
  const { user } = useUser();
  const { id } = useParams();
  const [isAPIKeyVisible, setIsAPIKeyVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("basic-information");

  const app = user?.apps.find((app) => app.id === id)!;

  const toggleAPIKeyVisibility = () => {
    setIsAPIKeyVisible(!isAPIKeyVisible);
  };

  return (
    <ScrollShadow className="w-full h-full p-4">
      <div className="flex flex-col justify-between gap-4 p-2 md:items-center md:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span>{app.name}</span>
            <Chip color="success" variant="dot" size="sm">
              Accepted
            </Chip>
          </div>

          <div className="flex items-center gap-1">
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
        </div>

        <div className="flex flex-col items-end justify-end gap-2 md:justify-center">
          <div className="flex items-center justify-end gap-2 md:justify-center">
            <p>API Key:</p>
            <Input
              readOnly
              className="font-[monospace] w-[11rem]"
              endContent={
                <button type="button" onClick={toggleAPIKeyVisibility}>
                  {isAPIKeyVisible ? (
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
              size="sm"
              type={isAPIKeyVisible ? "text" : "password"}
              value={app.apiKey!}
              variant="flat"
            />
            <CopyText iconClassName="h-[20px] w-[20px]" textClassName="hidden">
              {app.apiKey!}
            </CopyText>
          </div>

          <Code className="text-xs">
            App ID:
            <br className="md:hidden" />
            {app.id}
          </Code>
        </div>
      </div>

      <Tabs
        fullWidth
        aria-label="App tabs"
        classNames={{
          base: "my-4",
          panel: "w-full p-0 pt-4",
        }}
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
      >
        <Tab key="basic-information" title="Basic Information" />
        <Tab key="usage" title="Usage" />
        <Tab key="partner-keys" title="Partner Keys" />
        <Tab key="settings" title="Settings" />
      </Tabs>

      {activeTab === "basic-information" && <BasicInformation />}
      {activeTab === "usage" && <Usage />}
      {activeTab === "partner-keys" && <PartnerKeys />}
      {activeTab === "settings" && <Settings />}
    </ScrollShadow>
  );
}
