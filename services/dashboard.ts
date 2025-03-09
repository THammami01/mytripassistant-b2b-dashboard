import {
  UpdateAppBasicInformationFormType,
  UpdateAppPartnerKeysFormType,
  UpdateAppUsageFormType,
} from "@/app/dashboard/apps/[id]/types";
import { CreateAppFormType } from "@/app/dashboard/apps/types";
import { GiveFeedbackFormType } from "@/app/dashboard/common/types";
import { ChangeBasicInformationFormType } from "@/app/dashboard/settings/basic-information";
import {
  ChangeEmailFormType,
  ChangePasswordFormType,
} from "@/app/dashboard/settings/login-information";

const DashboardService = {
  async getUser(userId: string) {
    const response = await fetch(`/api/auth/user/${userId}`);

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Get user failed. ${err.error}.`);
    }

    return response.json();
  },

  async changeBasicInformation(data: ChangeBasicInformationFormType) {
    const response = await fetch(`/api/dashboard/change-basic-information`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Change basic information failed. ${err.error}.`);
    }

    return response.json();
  },

  async changeEmail(data: ChangeEmailFormType) {
    const response = await fetch(`/api/dashboard/change-email`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Change email failed. ${err.error}.`);
    }

    return response.json();
  },

  async changePassword(data: ChangePasswordFormType) {
    const response = await fetch(`/api/dashboard/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Change password failed. ${err.error}.`);
    }

    return response.json();
  },

  async giveFeedback(data: GiveFeedbackFormType) {
    const response = await fetch(`/api/dashboard/give-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Give feedback failed. ${err.error}.`);
    }

    return response.json();
  },

  async createApp(data: CreateAppFormType) {
    const response = await fetch(`/api/dashboard/create-app`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Create app failed. ${err.error}.`);
    }

    return response.json();
  },

  async updateAppBasicInformation(data: UpdateAppBasicInformationFormType) {
    const response = await fetch(
      `/api/dashboard/update-app-basic-information`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Update app basic information failed. ${err.error}.`);
    }

    return response.json();
  },

  async updateAppUsage(data: UpdateAppUsageFormType) {
    const response = await fetch(`/api/dashboard/update-app-usage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Update app usage failed. ${err.error}.`);
    }

    return response.json();
  },

  async updateAppPartnerKeys(data: UpdateAppPartnerKeysFormType) {
    const response = await fetch(`/api/dashboard/update-app-partner-keys`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Update app partner keys failed. ${err.error}.`);
    }

    return response.json();
  },
};

export default DashboardService;
