"use client";

import React from "react";
import {
  Button,
  Avatar,
  Input,
  Autocomplete,
  AutocompleteItem,
  Form,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import countries from "./countries";

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
        <p className="text-base font-medium text-default-700">
          Profile and Company Information
        </p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Manage your profile information and company details.
        </p>

        <Form
          className="mt-5"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Name */}
            <Input
              isRequired
              label="Firstname"
              labelPlacement="outside"
              placeholder="Enter firstname"
            />
            {/* Last Name */}
            <Input
              isRequired
              label="Lastname"
              labelPlacement="outside"
              placeholder="Enter lastname"
            />
            {/* Company Name */}
            <Input
              isRequired
              label="Company Name"
              labelPlacement="outside"
              placeholder="Enter company name"
            />
            {/* Tax ID */}
            <Input
              isRequired
              label="Tax ID"
              labelPlacement="outside"
              placeholder="Enter tax ID"
            />
            {/* Address */}
            <Input
              isRequired
              label="Address"
              labelPlacement="outside"
              placeholder="Enter address"
            />
            {/* State */}
            <Input
              isRequired
              label="State"
              labelPlacement="outside"
              placeholder="Enter state"
            />
            {/* Zip Code */}
            <Input
              isRequired
              label="Zip Code"
              labelPlacement="outside"
              placeholder="Enter zip code"
            />
            {/* Country */}
            <Autocomplete
              isRequired
              defaultItems={countries}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              showScrollIndicators={false}
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
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter phone number"
            />
            {/* Website */}
            <Input
              isRequired
              label="Website"
              labelPlacement="outside"
              placeholder="mytripassistant.com"
              startContent={
                <div className="flex items-center pointer-events-none">
                  <span className="text-default-400 text-small">https://</span>
                </div>
              }
              type="url"
            />
          </div>

          <div className="flex w-full gap-2 mt-3">
            {/* <Button radius="full" variant="bordered">
              Cancel
            </Button> */}
            <Button color="success" radius="full" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
