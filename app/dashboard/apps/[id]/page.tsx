"use client";

import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <Card isDisabled className="h-full" shadow="sm">
      <CardBody>App {id} (not implemented yet)</CardBody>
    </Card>
  );
}
