import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@/contexts/user";
import { getFaviconFromWebsiteUrl } from "@/config/helpers";

export default function Apps() {
  const { user } = useUser();

  return (
    <div className="flex flex-col flex-1 w-full gap-4 h-fit md:max-w-[350px]">
      <p className="text-sm font-medium">Recently Created Apps</p>

      {user?.apps
        ?.slice(0, 3)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((app) => (
          <Link key={app.id} href={`/dashboard/apps/${app.id}`}>
            <Card className="flex-1 p-4 border border-transparent shadow-small dark:border-default-100 hover:border-default-200 hover:bg-default-100 hover:cursor-pointer">
              <p className="text-sm font-medium" title={app.name}>
                {app.name}
              </p>

              <div className="flex items-center gap-1 mt-1.5">
                <Image
                  alt={app.name}
                  height={20}
                  src={getFaviconFromWebsiteUrl(app.url)}
                  width={20}
                  onError={(event) => {
                    const img = event.target as HTMLImageElement;

                    img.id =
                      "https://res.cloudinary.com/dgihbgsnz/image/upload/v1740901786/mytripassistant/app-favicon-placeholder-02_nktzmy.svg";
                    img.srcset =
                      "https://res.cloudinary.com/dgihbgsnz/image/upload/v1740901786/mytripassistant/app-favicon-placeholder-02_nktzmy.svg";
                  }}
                />

                <p
                  className="w-[14rem] truncate text-sm text-default-500"
                  title={app.url}
                >
                  {app.url}
                </p>
              </div>
            </Card>
          </Link>
        ))}

      {!user?.apps?.length && (
        <p className="text-sm text-default-500">No apps created yet.</p>
      )}
    </div>
  );
}
