import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
