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

import { signUpFormSchema, type SignUpFormType } from "./";

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
  } = useForm<SignUpFormType>({
    mode: "all",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      // email: "",
      // password: "",
      // confirmedPassword: "",
      email: "hello@gmail.com",
      password: "Hello1234@",
      confirmedPassword: "Hello1234@",
      agreeWithTermsAndPrivacy: false,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const onSubmit = async (data: SignUpFormType) => {
    if (data.password !== data.confirmedPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");
      return;
    }

    const reCaptchaToken = await executeRecaptcha("signUp");

    setIsLoading(true);

    AuthService.signUp({
      email: data.email,
      password: data.password,
      reCaptchaToken,
    })
      .then((_res) => {
        toast.success("Account created successfully.");
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
      <div className="flex flex-col items-center w-full max-w-sm gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Create Account</p>
          <p className="text-small text-default-500">
            Sign up for a new account to get started
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
            placeholder="Create a password"
            type={isPasswordVisible ? "text" : "password"}
            variant="flat"
            {...register("password")}
          />
          <Input
            description={errors?.confirmedPassword?.message}
            label="Confirm Password"
            placeholder="Confirm your password"
            type={isPasswordVisible ? "text" : "password"}
            variant="flat"
            {...register("confirmedPassword")}
          />
          <Checkbox
            className="py-4"
            size="sm"
            {...register("agreeWithTermsAndPrivacy")}
          >
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
          <Button
            color="primary"
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
            type="submit"
          >
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
