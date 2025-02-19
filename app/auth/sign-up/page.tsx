"use client";

import React from "react";
import { Button, Input, Link, Divider, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex items-center justify-center w-full bg-background lg:w-1/2">
      <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Create Account</p>
          <p className="text-small text-default-500">
            Sign up for a new account to get started
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Sign Up with Google
          </Button>
        </div>

        <div className="flex items-center w-full gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>

        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(e) => e.preventDefault()}
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
            placeholder="Create a password"
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
          <Input
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isVisible ? "text" : "password"}
            variant="flat"
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link
              className="z-10"
              href="https://mytripassistant.com/terms-of-service"
              size="sm"
              target="_blank"
            >
              Terms
            </Link>
            &nbsp;and&nbsp;
            <Link
              className="z-10"
              href="https://mytripassistant.com/privacy-policy"
              size="sm"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-small">
          Already have an account?&nbsp;
          <NextLink legacyBehavior passHref href="/auth/sign-in">
            <Link as="a" size="sm">
              Log In
            </Link>
          </NextLink>
        </p>
      </div>
    </div>
  );
}

