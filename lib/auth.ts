import { selectMailOptions } from "@lib/email-template"
import { db } from "@lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import nodemailer from "nodemailer"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({
        identifier,
        url,
        provider: { server, from },
      }) => {
        const mailTransporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        } as nodemailer.TransportOptions)

        try {
          const mailOptions = selectMailOptions("magic-link", {
            email: identifier,
            otp_link: url,
          })
          await mailTransporter.sendMail(mailOptions)
        } catch (error) {
          console.log("Error sending email:", error)
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }): Promise<JWT> {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        emailVerified: dbUser.emailVerified,
        image: dbUser.image,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
        role: dbUser.role,
        website: dbUser.website,
      }
    },
  },
}
