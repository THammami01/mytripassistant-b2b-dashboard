"use client";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <p className="text-base font-medium text-default-700">Email</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your email address.
        </p>
        <p>...</p>
      </div>

      <div>
        <p className="text-base font-medium text-default-700">Password</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your password.
        </p>
        <p>...</p>
      </div>
    </div>
  );
}
