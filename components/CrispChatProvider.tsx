"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

import { NEXT_PUBLIC_CRISP_WEBSITE_ID } from "@/config/public-constants";

const CrispChatProvider = () => {
  useEffect(() => {
    Crisp.configure(NEXT_PUBLIC_CRISP_WEBSITE_ID);
  });

  return null;
};

export default CrispChatProvider;
