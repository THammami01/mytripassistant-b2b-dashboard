import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";

import CustomAlert from "./CustomAlert";

import { useUser } from "@/contexts/user";

const FILL_IN_BASIC_INFORMATION_TITLE =
  "Please start by filling in basic information about you and your company in order to have access to the full functionality of the platform.";
const FILL_IN_BASIC_INFORMATION_BTN_LABEL = "Go to settings";
const FILL_IN_BASIC_INFORMATION_BTN_PATH =
  "/dashboard/settings/basic-information";

const CREATE_YOUR_FIRST_APP_TITLE = "Create your first app to get started.";
const CREATE_YOUR_FIRST_APP_BTN_LABEL = "Create app";
const CREATE_YOUR_FIRST_APP_BTN_PATH = "/dashboard/apps";

export function InitialSetupAlert() {
  const router = useRouter();
  const pathname = usePathname();
  const alertRef = React.useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const getData = () => {
    const data = {
      title: "",
      btnLabel: "",
      btnPath: "",
      isBtnShown: false,
    };

    const isFillInBasicInformationAlertShown = !user?.company?.name;

    if (isFillInBasicInformationAlertShown) {
      data.title = FILL_IN_BASIC_INFORMATION_TITLE;
      data.btnLabel = FILL_IN_BASIC_INFORMATION_BTN_LABEL;
      data.btnPath = FILL_IN_BASIC_INFORMATION_BTN_PATH;
      data.isBtnShown = !pathname.startsWith("/dashboard/settings");

      return data;
    }

    const isCreateYourFirstAppAlertShown = true;

    if (isCreateYourFirstAppAlertShown) {
      data.title = CREATE_YOUR_FIRST_APP_TITLE;
      data.btnLabel = CREATE_YOUR_FIRST_APP_BTN_LABEL;
      data.btnPath = CREATE_YOUR_FIRST_APP_BTN_PATH;
      data.isBtnShown = !pathname.startsWith("/dashboard/apps");

      return data;
    }

    return data;
  };

  const data = getData();

  if (!data.title) return null;

  return (
    <CustomAlert
      ref={alertRef}
      className="mt-4"
      color="default"
      title={data.title}
    >
      <div className="flex items-center gap-1 mt-3">
        {data.isBtnShown && (
          <Button
            className="font-medium bg-background text-default-700 border-1 shadow-small"
            size="sm"
            variant="bordered"
            onPress={() => router.push(data.btnPath)}
          >
            {data.btnLabel}
          </Button>
        )}
      </div>
    </CustomAlert>
  );
}
