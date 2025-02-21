import { type SignUpFormType } from "@/app/auth/sign-up";
import { type SignInFormType } from "@/app/auth/sign-in";
import { type ForgotPasswordFormType } from "@/app/auth/forgot-password";
import { type ResetPasswordFormType } from "@/app/auth/reset-password";
import { type ContinueWithGoogleFormType } from "@/app/auth/common";

export const AuthService = {
  async signUp(
    data: Omit<SignUpFormType, "confirmedPassword" | "agreeWithTermsAndPrivacy">
  ) {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Sign up failed. ${error.error}.`);
    }

    return response.json();
  },

  async signIn(data: SignInFormType) {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Sign in failed. ${error.error}.`);
    }

    return response.json();
  },

  async signOut() {
    const response = await fetch("/api/auth/sign-out", {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Sign out failed. ${error.error}.`);
    }

    return response.json();
  },

  async forgotPassword(data: ForgotPasswordFormType) {
    const response = await fetch("/api/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Forgot password failed. ${error.error}.`);
    }

    return response.json();
  },

  async resetPassword(data: ResetPasswordFormType) {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Reset password failed. ${error.error}.`);
    }

    return response.json();
  },

  async continueWithGoogle(data: ContinueWithGoogleFormType) {
    const response = await fetch("/api/auth/continue-with-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Continue with google failed. ${error.error}.`);
    }

    return response.json();
  },

  async getUser(userId: string) {
    const response = await fetch(`/api/auth/user/${userId}`);

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      throw new Error(`Get user failed. ${error.error}.`);
    }

    return response.json();
  },
};
