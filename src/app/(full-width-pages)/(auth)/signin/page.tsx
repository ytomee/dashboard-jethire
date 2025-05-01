import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | JetHire",
  description: "Página de login da JetHire - Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
