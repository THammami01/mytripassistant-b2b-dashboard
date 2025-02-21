"use client";

import React from "react";
import { Button, Input, Link, Divider, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { signInFormSchema, type SignInFormType } from "./";

import { ContinueWithGoogleBtn } from "@/components";
import { AuthService } from "@/services";

export default function Page() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormType>({
    mode: "all",
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      // email: "",
      // password: "",
      email: "hello@gmail.com",
      password: "Hello1234@",
      rememberMe: false,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const onSubmit = async (data: SignInFormType) => {
    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");
      return;
    }

    const reCaptchaToken = await executeRecaptcha("signIn");

    setIsLoading(true);

    AuthService.signIn({
      email: data.email,
      password: data.password,
      reCaptchaToken,
    })
      .then((res) => {
        toast.success("Signed in successfully.");
        router.push("/dashboard");
        console.log(res);
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
      <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <ContinueWithGoogleBtn />
        </div>

        <div className="flex items-center w-full gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
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
            label="Password"
            placeholder="Enter your password"
            type={isPasswordVisible ? "text" : "password"}
            variant="flat"
            {...register("password")}
          />
          <div className="flex items-center justify-between w-full px-1 py-2">
            <Checkbox size="sm" {...register("rememberMe")}>
              Remember for 15 days
            </Checkbox>
            <NextLink legacyBehavior passHref href="/auth/forgot-password">
              <Link as="a" className="text-default-500" size="sm">
                Forgot password?
              </Link>
            </NextLink>
          </div>
          <Button
            className="w-full"
            color="primary"
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
            type="submit"
          >
            Log In
          </Button>
        </form>

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
