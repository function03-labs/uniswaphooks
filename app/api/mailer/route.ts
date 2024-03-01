import nodemailer from "nodemailer";
import { selectMailOptions } from "@lib/email-template";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    !process.env.EMAIL_SENDER ||
    !process.env.EMAIL_SERVER_PASSWORD ||
    !process.env.MAIN_EMAIL
  ) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const mailTransporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    const mailOptions = selectMailOptions(body.type, body);
    await mailTransporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
