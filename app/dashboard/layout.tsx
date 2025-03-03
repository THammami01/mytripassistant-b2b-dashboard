import { headers } from "next/headers";

import SubLayout from "./common/SubLayout";

import { getUserById } from "@/app/actions/dashboard/getUserById";
import { UserProvider, User } from "@/contexts/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id")!;
  const user = userId ? await getUserById(userId) : null;

  return (
    <UserProvider initialUser={user as User}>
      <div className="flex lg:pl-4 min-h-dvh">
        <SubLayout>{children}</SubLayout>
      </div>
    </UserProvider>
  );
}
