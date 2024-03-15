import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@prisma/client";

export type MagicLinkData = {
  email: string;
  otp_link: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}
