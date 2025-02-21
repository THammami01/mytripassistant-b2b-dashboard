import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { CodeResponse } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function ContinueWithGoogleBtn() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSuccess = async (codeResponse: CodeResponse) => {
    if (!executeRecaptcha) {
      toast.error("Google reCAPTCHA is not available.");
      return;
    }

    const reCaptchaToken = await executeRecaptcha("signInWithGoogle");

    console.log(codeResponse.code, reCaptchaToken);
  };

  const onError = () => toast.error("Something went wrong, try again.");

  const handleSignInWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess,
    onError,
  });

  return (
    <Button
      startContent={<Icon icon="flat-color-icons:google" width={24} />}
      variant="bordered"
      onPress={() => handleSignInWithGoogle()}
    >
      Continue with Google
    </Button>
  );
}
