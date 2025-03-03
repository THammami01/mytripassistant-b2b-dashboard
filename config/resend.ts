import { Resend } from "resend";

import { RESEND_API_KEY } from "./server-constants";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function sendEmail(to: string | string[], subject: string, html: string) {
  if (!resend) {
    console.error("Resend API key not configured");
    throw new Error("Email service not configured");
    }

  try {
    await resend.emails.send({
      from: "MyTripAssistant Team <noreply@b2b.mytripassistant.com>",
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    throw new Error("Failed to send email");
  }
}

export default resend;
