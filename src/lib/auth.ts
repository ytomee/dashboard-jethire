import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import Administrator from "@/models/admin";
import Company from "@/models/company";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Utilizador", type: "text" },
        pass: { label: "Palavra-passe", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const { user, pass } = credentials!;

        // Primeiro tenta encontrar como administrador
        const admin = await Administrator.findOne({ user });
        if (admin) {
          const isPasswordValid = await bcrypt.compare(pass, admin.pass);
          if (!isPasswordValid) throw new Error("Palavra-passe incorreta");
          return {
            id: admin._id.toString(),
            name: admin.name,
            type: "admin",
          };
        }

        // Depois tenta encontrar como empresa
        const company = await Company.findOne({ user });
        if (company) {
          const isPasswordValid = await bcrypt.compare(pass, company.pass);
          if (!isPasswordValid) throw new Error("Palavra-passe incorreta");
          return {
            id: company._id.toString(),
            name: company.name,
            type: "company",
          };
        }

        throw new Error("Utilizador não encontrado");
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.type = token.type;
        session.user.name = token.name;
      }
      return session;
    },
  },
};