"use client";

import { redirect } from "next/navigation";

import { useUser } from "@/contexts/user";

export default function Page() {
  const { user } = useUser();

  return redirect(`/dashboard/apps/${user?.apps[0].id}`);
}
