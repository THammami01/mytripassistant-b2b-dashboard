"use client";

import PerformanceTable from "./PerformanceTable";

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-8 mb-4 md:mb-0">
      <h2 className="text-small text-default-500">View your performance report.</h2>

      <div className="flex flex-col gap-4">
        <PerformanceTable />
      </div>
    </div>
  );
}
