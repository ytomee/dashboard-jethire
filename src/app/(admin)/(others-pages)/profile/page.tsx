import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProfileClient from "@/components/profile/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Editar perfil | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function ProfilePage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Editar perfil" />
      <ProfileClient />
    </div>
  );
}
