import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CompanyEditPage from "@/components/company/edit/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Editar empresa | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function CompanyEdit() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Editar empresa" />
      <CompanyEditPage />
    </div>
  );
}
