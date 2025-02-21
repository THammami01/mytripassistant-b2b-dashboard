"use client";

import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services";
import { useUser } from "@/contexts/user";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.push("/auth/sign-in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md gap-4 mx-auto">
      <h1>Dashboard</h1>
      <p>Hello, {user?.email}</p>
      <Button
        isDisabled={isLoading}
        isLoading={isLoading}
        onPress={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
}
