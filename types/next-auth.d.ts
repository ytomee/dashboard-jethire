import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      type: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    type: string;
  }
}