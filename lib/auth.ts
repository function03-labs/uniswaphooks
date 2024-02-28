import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import nodemailer from "nodemailer";
import { selectMailOptions } from "@lib/email-template";

import { db } from "@lib/prisma";

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
          host: "smtp-relay.brevo.com",
          port: 587,
          auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        });

        try {
          const mailOptions = selectMailOptions("magic-link", {
            email: identifier,
            otp_link: url,
          });
          await mailTransporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // @ts-ignore: Property 'id' does not exist on type 'Session'.
        session.user!.id = token.id;
        session.user!.name = token.name;
        session.user!.email = token.email;
        session.user!.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
