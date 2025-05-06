import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import Administrator from "@/models/admin";
import Company from "@/models/company";

interface TeamMember {
  user: string;
  password: string;
  role: string;
  company: string;
}

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

        const admin = await Administrator.findOne({ user });
        if (admin) {
          const isPasswordValid = await bcrypt.compare(pass, admin.pass);
          if (!isPasswordValid) throw new Error("Palavra-passe incorreta");
          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            type: "admin",
          };
        }

        const company = await Company.findOne({ "team.user": user });
        if (company) {
          const teamMember = company.team.find((member: TeamMember) => member.user === user);
          if (teamMember) {
            const isPasswordValid = await bcrypt.compare(pass, teamMember.password);
            if (!isPasswordValid) throw new Error("Palavra-passe incorreta");
            return {
              id: teamMember._id.toString(),
              name: teamMember.name,
              email: teamMember.email,
              type: "company",
              company: company.name,
              role: teamMember.role,
            };
          }
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
        token.role = user.role;
        token.company = user.company;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.type = token.type;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.company = token.company;
      }
      return session;
    },
  },
};