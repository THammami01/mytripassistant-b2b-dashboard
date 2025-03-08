"use client";

import { Icon } from "@iconify/react";
import { Alert, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import Graph from "./Graph";
import KPIStats from "./KPIStats";
import Circles from "./Circles";
import Apps from "./Apps";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full gap-8 mb-4 md:mb-0">
      <h2 className="text-small text-default-500">
        View your news, KPI stats, and analytics.
      </h2>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col-reverse items-end justify-between gap-4 md:items-start md:flex-row">
          <Alert
            className="shadow-small"
            color="success"
            description={
              <p className="mt-1">
                <span className="font-medium">IMPORTANT:</span> Our team is
                working on new features that will allow you to explore more your
                data and analytics. Stay tuned!
              </p>
            }
            icon={<Icon icon="solar:info-circle-bold" width={20} />}
            title="News and notices"
            variant="flat"
          />

          <Button
            className="!min-w-fit"
            color="default"
            endContent={
              <Icon
                className="min-w-fit"
                icon="solar:add-circle-bold"
                width={20}
              />
            }
            variant="light"
            onPress={() => router.push("/dashboard/apps")}
          >
            Add a new app
          </Button>
        </div>

        <Circles />

        <KPIStats />

        <div className="flex flex-col gap-8 md:gap-5 md:flex-row">
          <Graph />
          <Apps />
        </div>
      </div>
    </div>
  );
}
