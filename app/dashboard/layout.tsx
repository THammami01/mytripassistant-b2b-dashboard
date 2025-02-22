import { headers } from "next/headers";

import { getUser } from "../actions/dashboard/getUser";

import { UserProvider, User } from "@/contexts/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id")!;
  const user = userId ? await getUser(userId) : null;

  return (
    <UserProvider initialUser={user as User}>
      <div className="flex min-h-screen">{children}</div>
    </UserProvider>
  );
}
