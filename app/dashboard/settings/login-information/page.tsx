"use client";

import { Alert, Button, Divider } from "@heroui/react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  changeEmailFormSchema,
  ChangeEmailFormType,
  changePasswordFormSchema,
  ChangePasswordFormType,
} from "./types";

import { DashboardService } from "@/services";
import { useUser } from "@/contexts/user";

export default function Page() {
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid: emailIsValid },
  } = useForm<ChangeEmailFormType>({
    mode: "all",
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: "",
      password: "",
    },
  });
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isValid: passwordIsValid },
  } = useForm<ChangePasswordFormType>({
    mode: "all",
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const [isChangeEmailLoading, setIsChangeEmailLoading] = useState(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const { user, setUser } = useUser();

  const onChangeEmailSubmit = (data: ChangeEmailFormType) => {
    setIsChangeEmailLoading(true);

    DashboardService.changeEmail(data)
      .then((res) => {
        toast.success("Email updated successfully.");
        setUser(res);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsChangeEmailLoading(false);
      });
  };

  const onChangePasswordSubmit = (data: ChangePasswordFormType) => {
    setIsChangePasswordLoading(true);

    DashboardService.changePassword(data)
      .then((res) => {
        toast.success("Password updated successfully.");
        setUser(res);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsChangePasswordLoading(false);
      });
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      <div>
        <p className="text-base font-medium text-default-700">Email</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your email address.
        </p>

        <div className="flex items-center justify-center w-full my-3">
          <Alert
            hideIcon
            description={user?.email}
            title="Your current email address:"
          />
        </div>

        <form
          className="mt-5"
          onSubmit={handleEmailSubmit(onChangeEmailSubmit)}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* Email */}
            <Input
              isRequired
              description={emailErrors?.newEmail?.message}
              label="New Email"
              labelPlacement="outside"
              placeholder="Enter new email"
              type="email"
              {...registerEmail("newEmail")}
            />
            {/* Password */}
            <Input
              isRequired
              description={emailErrors?.password?.message}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter password"
              type="password"
              {...registerEmail("password")}
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            <Button
              color="success"
              isDisabled={!emailIsValid || isChangeEmailLoading}
              isLoading={isChangeEmailLoading}
              radius="full"
              type="submit"
            >
              Change Email
            </Button>
          </div>
        </form>
      </div>

      <Divider className="mt-3" />

      <div>
        <p className="text-base font-medium text-default-700">Password</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your password.
        </p>

        <form
          className="mt-5"
          onSubmit={handlePasswordSubmit(onChangePasswordSubmit)}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* Current Password */}
            <Input
              isRequired
              description={passwordErrors?.currentPassword?.message}
              label="Current Password"
              labelPlacement="outside"
              placeholder="Enter current password"
              type="password"
              {...registerPassword("currentPassword")}
            />
            {/* New Password */}
            <Input
              isRequired
              description={passwordErrors?.newPassword?.message}
              endContent={
                <button type="button" onClick={toggleNewPasswordVisibility}>
                  {isNewPasswordVisible ? (
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
              labelPlacement="outside"
              placeholder="Enter new password"
              type={isNewPasswordVisible ? "text" : "password"}
              {...registerPassword("newPassword")}
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            <Button
              color="success"
              isDisabled={!passwordIsValid || isChangePasswordLoading}
              isLoading={isChangePasswordLoading}
              radius="full"
              type="submit"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
