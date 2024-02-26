import nodemailer from "nodemailer";
import { selectMailOptions } from "@lib/email-template";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    !process.env.SENDER_EMAIL ||
    !process.env.SENDER_PASSWORD ||
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
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
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
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
