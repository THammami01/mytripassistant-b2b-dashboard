import { Resend } from "resend";

import { RESEND_API_KEY } from "@/config/server-constants";

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  html: string
) => {
  await resend.emails.send({
    from: "MyTripAssistant Team <noreply@b2b.mytripassistant.com>",
    to: email,
    subject,
    html,
  });
};

export default resend;
