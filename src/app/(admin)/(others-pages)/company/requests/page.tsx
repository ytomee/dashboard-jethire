import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RequestsPage from "@/components/company/requests/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Registo de Empresas | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function CompanyRequests() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Registos de empresas" />
      <RequestsPage />
    </div>
  );
}
