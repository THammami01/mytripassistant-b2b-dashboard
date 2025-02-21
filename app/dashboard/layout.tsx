import { headers } from "next/headers";

import { getUser } from "../actions/dashboard/getUser";

import { UserProvider } from "@/contexts/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id")!;
  const user = userId ? await getUser(userId) : null;

  return (
    <UserProvider initialUser={user}>
      <div className="flex min-h-screen">{children}</div>
    </UserProvider>
  );
}
