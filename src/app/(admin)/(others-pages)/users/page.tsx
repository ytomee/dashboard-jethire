import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsersPage from "@/components/users/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Utilizadores | JetHire",
  description: "Lista de utilizadores.",
};

export default function ProfilePage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Ver utilizadores" />
      <UsersPage />
    </div>
  );
}
