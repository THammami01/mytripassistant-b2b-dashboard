"use client";

import React from "react";
import { Button, Input, Link, Divider, Checkbox, Form } from "@heroui/react";
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
          <p className="pb-2 text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
        </div>

        <div className="flex items-center w-full gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>

        <Form
          className="flex flex-col w-full gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="flat"
          />
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
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
          <div className="flex items-center justify-between w-full px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember for 15 days
            </Checkbox>
            <NextLink legacyBehavior passHref href="/auth/forget-password">
              <Link as="a" className="text-default-500" size="sm">
                Forgot password?
              </Link>
            </NextLink>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>

        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <NextLink legacyBehavior passHref href="/auth/sign-up">
            <Link as="a" size="sm">
              Sign Up
            </Link>
          </NextLink>
        </p>
      </div>
    </div>
  );
}
