import { type SignUpFormType } from "@/app/auth/sign-up";
import { type SignInFormType } from "@/app/auth/sign-in";
import { type ForgotPasswordFormType } from "@/app/auth/forgot-password";
import { type ResetPasswordFormType } from "@/app/auth/reset-password";
import { type ContinueWithGoogleFormType } from "@/app/auth/common";

const AuthService = {
  async signUp(
    data: Omit<SignUpFormType, "confirmedPassword" | "agreeWithTermsAndPrivacy">
  ) {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Sign up failed. ${err.error}.`);
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
      const err = await response.json();
      console.error(err);

      throw new Error(`Sign in failed. ${err.error}.`);
    }

    return response.json();
  },

  async signOut() {
    const response = await fetch("/api/auth/sign-out", {
      method: "POST",
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Sign out failed. ${err.error}.`);
    }

    return response.json();
  },

  async forgotPassword(data: ForgotPasswordFormType) {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Forgot password failed. ${err.error}.`);
    }

    return response.json();
  },

  async resetPassword(data: Omit<ResetPasswordFormType, "confirmedPassword">) {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error(err);

      throw new Error(`Reset password failed. ${err.error}.`);
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
      const err = await response.json();
      console.error(err);

      throw new Error(`Continue with google failed. ${err.error}.`);
    }

    return response.json();
  },
};

export default AuthService;
