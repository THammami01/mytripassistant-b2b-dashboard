"use client";

import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";

import { useUser } from "@/contexts/user";

export default function Page() {
  const { id } = useParams();
  const { user } = useUser();

  const app = user?.apps?.find((app) => app.id === id);
  console.log(app);

  return (
    <Card
      isDisabled
      className="min-h-[calc(50vh)] md:min-h-auto md:h-full"
      shadow="sm"
    >
      <CardBody>
        {id === "create-a-new-app"
          ? "Start by creating a new app"
          : `App ${id} (not implemented yet)`}
      </CardBody>
    </Card>
  );
}
