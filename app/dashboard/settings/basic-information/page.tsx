"use client";

import React from "react";
import {
  Button,
  Avatar,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import countries from "./countries";
import {
  changeBasicInformationFormSchema,
  ChangeBasicInformationFormType,
} from "./types";

import { DashboardService } from "@/services";
import { useUser } from "@/contexts/user";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangeBasicInformationFormType>({
    mode: "all",
    resolver: zodResolver(changeBasicInformationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      address: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      website: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        companyName: user?.company?.name || "",
        address: user?.company?.address || "",
        state: user?.company?.state || "",
        zipCode: user?.company?.zipCode || "",
        country:
          countries.find((country) => country.name === user?.company?.country)
            ?.code || "",
        phoneNumber: user?.company?.phoneNumber || "",
        website: user?.company?.website || "",
      });
    }
  }, [user]);

  const onSubmit = (data: ChangeBasicInformationFormType) => {
    setIsLoading(true);

    DashboardService.changeBasicInformation(data)
      .then((res) => {
        toast.success("Basic information updated successfully.");
        setUser(res);
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
    <div className="flex flex-col gap-5 p-2">
      <div>
        <p className="text-base font-medium text-default-700">
          Profile and Company Information
        </p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your profile information and company details.
        </p>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Name */}
            <Input
              isRequired
              description={errors?.firstName?.message}
              label="First Name"
              labelPlacement="outside"
              placeholder="Enter first name"
              {...register("firstName")}
            />
            {/* Last Name */}
            <Input
              isRequired
              description={errors?.lastName?.message}
              label="Last Name"
              labelPlacement="outside"
              placeholder="Enter last name"
              {...register("lastName")}
            />
            {/* Company Name */}
            <Input
              isRequired
              description={errors?.companyName?.message}
              label="Company Name"
              labelPlacement="outside"
              placeholder="Enter company name"
              {...register("companyName")}
            />
            {/* Address */}
            <Input
              isRequired
              description={errors?.address?.message}
              label="Address"
              labelPlacement="outside"
              placeholder="Enter address"
              {...register("address")}
            />
            {/* State */}
            <Input
              isRequired
              description={errors?.state?.message}
              label="State"
              labelPlacement="outside"
              placeholder="Enter state"
              {...register("state")}
            />
            {/* Zip Code */}
            <Input
              isRequired
              description={errors?.zipCode?.message}
              label="Zip Code"
              labelPlacement="outside"
              placeholder="Enter zip code"
              {...register("zipCode")}
            />
            {/* Country */}
            <Autocomplete
              isRequired
              defaultItems={countries}
              description={errors?.country?.message}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              showScrollIndicators={false}
              {...register("country")}
            >
              {(item) => (
                <AutocompleteItem
                  key={item.code}
                  startContent={
                    <Avatar
                      alt="Country Flag"
                      className="w-6 h-6"
                      src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                    />
                  }
                >
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            {/* Phone Number */}
            <Input
              isRequired
              description={errors?.phoneNumber?.message}
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter phone number"
              {...register("phoneNumber")}
            />
            {/* Website */}
            <Input
              isRequired
              description={errors?.website?.message}
              label="Website"
              labelPlacement="outside"
              placeholder="e.g. https://mytripassistant.com"
              // startContent={
              //   <div className="flex items-center pointer-events-none">
              //     <span className="text-default-400 text-small">https://</span>
              //   </div>
              // }
              type="url"
              {...register("website")}
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            <Button
              color="success"
              isDisabled={!isValid || isLoading}
              isLoading={isLoading}
              radius="full"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
