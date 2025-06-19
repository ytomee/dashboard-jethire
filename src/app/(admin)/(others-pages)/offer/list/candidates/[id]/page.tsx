import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CandidatesPage from "@/components/offer/candidates/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ver candidatos | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function AddTeamMember() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ver candidatos" />
      <CandidatesPage />
    </div>
  );
}
