"use client";

import React from "react";
import { Button, Input, Link } from "@heroui/react";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { forgotPasswordFormSchema, ForgotPasswordFormType } from "./types";

export default function Page() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormType>({
    mode: "all",
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      // email: "",
      email: "hello@gmail.com",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormType) => {
    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");
      return;
    }

    const reCaptchaToken = await executeRecaptcha("forgotPassword");

    console.log(data, reCaptchaToken);
  };

  return (
    <div className="flex items-center justify-center w-full bg-background lg:w-1/2">
      <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Forgot Password</p>
          <p className="text-small text-default-500">
            Regain access to your account
          </p>
        </div>

        <form
          className="flex flex-col w-full gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            description={errors?.email?.message}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            variant="flat"
            {...register("email")}
          />
          <Button
            className="w-full"
            color="primary"
            isDisabled={!isValid}
            type="submit"
          >
            Send Reset Link
          </Button>
        </form>

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
