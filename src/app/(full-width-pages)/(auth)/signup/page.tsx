import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registo | JetHire",
  description: "Página de registo da JetHire - Dashboard",
};

export default function SignUp() {
  return <SignUpForm />;
}
