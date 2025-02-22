"use client";

import { Button, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-default-500">Page not found</p>
      <p className="text-center text-md text-default-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button color="primary" onPress={() => router.push("/")}>
        Go to homepage
      </Button>

      <Divider className="w-full mt-8" />
      <div className="flex items-center">
        <Image alt="logo" height={40} src="/logo192.png" width={40} />
        <p className="font-medium">
          MyTripAssistant <span className="text-gray-400">| B2B Dashboard</span>
        </p>
      </div>
    </div>
  );
}
