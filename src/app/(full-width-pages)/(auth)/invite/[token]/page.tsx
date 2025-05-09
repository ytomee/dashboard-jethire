import AddMemberForm from "@/components/auth/AddMemberForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validar conta | JetHire",
  description: "Página de login da JetHire - Dashboard",
};

export default function AddMember() {
  return <AddMemberForm />;
}
