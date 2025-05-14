import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CompanyList from "@/components/company/list/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Registo de Empresas | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function CompanyRequests() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Lista de empresas" />
      <CompanyList />
    </div>
  );
}
