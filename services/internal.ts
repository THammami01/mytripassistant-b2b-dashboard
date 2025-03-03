import { ReviewAppRequestType } from "@/app/internal/review-app/types";

const InternalService = {
  async reviewApp(data: ReviewAppRequestType) {
    const response = await fetch("/api/internal/review-app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Review app failed. ${err.error}.`);
    }

    return response.json();
  },
};

export default InternalService;
