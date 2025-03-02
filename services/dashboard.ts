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
      const error = await response.json();
      console.log(error);

      throw new Error(`Get user failed. ${error.error}.`);
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
      const error = await response.json();
      console.log(error);

      throw new Error(`Change basic information failed. ${error.error}.`);
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
      const error = await response.json();
      console.log(error);

      throw new Error(`Change email failed. ${error.error}.`);
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
      const error = await response.json();
      console.log(error);

      throw new Error(`Change password failed. ${error.error}.`);
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
      const error = await response.json();
      console.log(error);

      throw new Error(`Give feedback failed. ${error.error}.`);
    }

    return response.json();
  },
};

export default DashboardService;
