import { headers } from "next/headers";

import { UserProvider } from "@/contexts/user";
import { AuthService } from "@/services";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const userId = (await headersList).get("x-user-id");
  const user = userId ? await AuthService.getUser(userId) : null;
  
  return (
    <UserProvider initialUser={user}>
      <div className="flex min-h-screen">{children}</div>
    </UserProvider>
  );
}
