import { selectMailOptions } from "@lib/email-template"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const body = await req.json()

  if (
    !process.env.EMAIL_SENDER ||
    !process.env.EMAIL_SERVER_PASSWORD ||
    !process.env.EMAIL_RECEIVERS
  ) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const mailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  } as nodemailer.TransportOptions)

  try {
    const mailOptions = selectMailOptions(body.type, body)
    await mailTransporter.sendMail(mailOptions)
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
