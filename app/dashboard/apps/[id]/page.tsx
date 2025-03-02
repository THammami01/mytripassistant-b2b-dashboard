"use client";

import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <Card isDisabled className="min-h-[calc(50vh)] md:min-h-auto md:h-full" shadow="sm">
      <CardBody>
        {id === "create-a-new-app"
          ? "Start by creating a new app"
          : `App ${id} (not implemented yet)`}
      </CardBody>
    </Card>
  );
}
