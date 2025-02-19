"use client";

import React from "react";
import { Button, Input, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="flex items-center justify-center w-full bg-background lg:w-1/2">
      <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Reset Password</p>
          <p className="text-small text-default-500">
            Regain access to your account
          </p>
        </div>

        <Form
          className="flex flex-col w-full gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-2xl pointer-events-none text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-2xl pointer-events-none text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="New Password"
            name="password"
            placeholder="Create a new password"
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
          <Input
            isRequired
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
          <Button className="w-full" color="primary" type="submit">
            Reset Password
          </Button>
        </Form>

        <p className="text-center text-small">
          Remember your credentials?&nbsp;
          <NextLink legacyBehavior passHref href="/auth/sign-in">
            <Link as="a" size="sm">
              Sign In
            </Link>
          </NextLink>
        </p>
      </div>
    </div>
  );
}

