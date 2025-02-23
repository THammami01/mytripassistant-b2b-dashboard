"use client";

import { Button, Divider, Form } from "@heroui/react";
import { Input } from "@heroui/react";

export default function Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      <div>
        <p className="text-base font-medium text-default-700">Email</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your email address.
        </p>

        <Form
          className="mt-5"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* Email */}
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              placeholder="Enter new email"
              type="email"
            />
            {/* Password */}
            <Input
              isRequired
              label="Password"
              labelPlacement="outside"
              placeholder="Enter password"
              type="password"
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            {/* <Button radius="full" variant="bordered">
              Cancel
            </Button> */}
            <Button color="success" radius="full" type="submit">
              Change Email
            </Button>
          </div>
        </Form>
      </div>

      <Divider className="mt-3" />

      <div>
        <p className="text-base font-medium text-default-700">Password</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your password.
        </p>

        <Form
          className="mt-5"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* Current Password */}
            <Input
              isRequired
              label="Current Password"
              labelPlacement="outside"
              placeholder="Enter current password"
              type="password"
            />
            {/* New Password */}
            <Input
              isRequired
              label="New Password"
              labelPlacement="outside"
              placeholder="Enter new password"
              type="password"
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            {/* <Button radius="full" variant="bordered">
              Cancel
            </Button> */}
            <Button color="success" radius="full" type="submit">
              Change Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
