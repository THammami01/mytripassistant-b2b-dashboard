import ReviewAppPageContent from "./ReviewAppPageContent";

import { getAppByReviewToken } from "@/app/actions/internal/getAppByReviewToken";

export default async function ReviewAppPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const token = (await searchParams).token as string;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-dvh">
        <h1 className="text-4xl font-bold">Token not found</h1>
        <p className="text-center text-md text-default-500">
          No token was provided.
        </p>

        <hr className="w-full mt-8" />
        <div className="flex items-center">
          <p className="font-medium">
            MyTripAssistant{" "}
            <span className="text-gray-400">| B2B Dashboard</span>
          </p>
        </div>
      </div>
    );
  }

  try {
    const app = await getAppByReviewToken(token);

    if (!app) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-dvh">
          <h1 className="text-4xl font-bold">App not found</h1>
          <p className="text-center text-md text-default-500">
            The app you are trying to review could not be found.
          </p>

          <hr className="w-full mt-8" />
          <div className="flex items-center">
            <p className="font-medium">
              MyTripAssistant{" "}
              <span className="text-gray-400">| B2B Dashboard</span>
            </p>
          </div>
        </div>
      );
    }

    return <ReviewAppPageContent app={app} token={token} />;
  } catch (err) {
    console.error(err);

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-dvh">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-center text-md text-default-500">
          An error occurred while loading the page.
        </p>

        <hr className="w-full mt-8" />
        <div className="flex items-center">
          <p className="font-medium">
            MyTripAssistant{" "}
            <span className="text-gray-400">| B2B Dashboard</span>
          </p>
        </div>
      </div>
    );
  }
}
