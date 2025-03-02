"use client";

import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <Card isDisabled className="h-full" shadow="sm">
      <CardBody>
        {id === "create-a-new-app"
          ? "Start by creating a new app"
          : `App ${id} (not implemented yet)`}
      </CardBody>
    </Card>
  );
}
