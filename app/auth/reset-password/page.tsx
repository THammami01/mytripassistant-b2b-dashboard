"use client";

import React from "react";
import { Button, Input, Link, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

import { resetPasswordFormSchema, ResetPasswordFormType } from "./types";

import { AuthService } from "@/services";

export default function Page() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormType>({
    mode: "all",
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmedPassword: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [resetPasswordToken, setResetPasswordToken] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) setResetPasswordToken(token);
    else {
      toast.error("Reset password token is either invalid or not found.");
      redirect("/");
    }
  }, []);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const onSubmit = async (data: ResetPasswordFormType) => {
    if (data.password !== data.confirmedPassword) {
      toast.error("Passwords do not match.");

      return;
    }

    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");

      return;
    }

    const reCaptchaToken = await executeRecaptcha("forgotPassword");

    setIsLoading(true);

    AuthService.resetPassword({
      password: data.password,
      resetPasswordToken: resetPasswordToken!,
      reCaptchaToken,
    })
      .then((_res) => {
        toast.success("Password reset successfully.");
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center w-full bg-background lg:w-1/2">
      {!resetPasswordToken && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
          <Skeleton className="w-full h-4 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
        </div>
      )}

      {resetPasswordToken && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
          <div className="w-full text-left">
            <p className="pb-2 text-xl font-medium">Reset Password</p>
            <p className="text-small text-default-500">
              Regain access to your account
            </p>
          </div>

          <form
            className="flex flex-col w-full gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              description={errors?.password?.message}
              endContent={
                <button type="button" onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? (
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
              placeholder="Create a new password"
              type={isPasswordVisible ? "text" : "password"}
              variant="flat"
              {...register("password")}
            />
            <Input
              description={errors?.confirmedPassword?.message}
              label="Confirm New Password"
              placeholder="Confirm your new password"
              type={isPasswordVisible ? "text" : "password"}
              variant="flat"
              {...register("confirmedPassword")}
            />
            <Button
              className="w-full"
              color="success"
              isDisabled={!isValid || isLoading}
              isLoading={isLoading}
              type="submit"
            >
              Reset Password
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
      )}
    </div>
  );
}
