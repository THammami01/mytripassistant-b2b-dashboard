import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { CodeResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

import { AuthService } from "@/services";

export default function ContinueWithGoogleBtn() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSuccess = async (codeResponse: CodeResponse) => {
    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");

      return;
    }

    const reCaptchaToken = await executeRecaptcha("signInWithGoogle");

    setIsLoading(true);
    
    AuthService.continueWithGoogle({
      oauthCode: codeResponse.code,
      reCaptchaToken,
    })
      .then((res) => {
        toast.success(
          res.isNewAccount
            ? "Account created successfully."
            : "Signed in successfully."
        );
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

  const onError = () => toast.error("Something went wrong, try again.");

  const handleSignInWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess,
    onError,
  });

  return (
    <Button
      isDisabled={isLoading}
      isLoading={isLoading}
      startContent={<Icon icon="flat-color-icons:google" width={24} />}
      variant="bordered"
      onPress={() => handleSignInWithGoogle()}
    >
      Continue with Google
    </Button>
  );
}
