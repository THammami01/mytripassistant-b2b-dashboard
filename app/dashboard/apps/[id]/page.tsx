"use client";

import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";

import AppTabs from "./AppTabs";

import { useUser } from "@/contexts/user";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();

  const app = user?.apps?.find((app) => app.id === id);

  return (
    <Card
      className="min-h-[calc(50vh)] md:min-h-auto md:h-full shadow-small"
      isDisabled={app?.reviewStatus !== "ACCEPTED"}
      shadow="sm"
    >
      <CardBody className="p-0">
        {id === "create-a-new-app" && (
          <div className="flex items-center justify-center w-full h-[calc(50vh)] md:h-full text-md">
            <p>
              {user?.company?.name && <>Start by creating a new app</>}
              {!user?.company?.name && (
                <>Please fill in your basic information first.</>
              )}
            </p>
          </div>
        )}

        {app?.reviewStatus === "PENDING" && (
          <div className="flex items-center justify-center w-full h-[calc(50vh)] md:h-full gap-2 text-md">
            <Icon height="24" icon="material-symbols:pending" width="24" />
            <p>Your app is pending review.</p>
          </div>
        )}

        {app?.reviewStatus === "REJECTED" && (
          <div className="flex items-center justify-center w-full h-[calc(50vh)] md:h-full gap-2 text-danger-900 text-md">
            <Icon height="20" icon="el:ban-circle" width="20" />
            <p>Your app was rejected.</p>
          </div>
        )}

        {app?.reviewStatus === "ACCEPTED" && <AppTabs />}
      </CardBody>
    </Card>
  );
}
