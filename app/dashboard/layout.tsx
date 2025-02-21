import { headers } from "next/headers";

import { UserProvider } from "@/contexts/user";

async function getUser(userId: string, session: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user/${userId}`,
    {
      headers: {
        "x-session": session,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id")!;
  const session = headersList.get("x-session")!;
  const user = userId ? await getUser(userId, session) : null;

  return (
    <UserProvider initialUser={user}>
      <div className="flex min-h-screen">{children}</div>
    </UserProvider>
  );
}
