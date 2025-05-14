import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import TeamPage from "@/components/team/list/Page";

export const metadata: Metadata = {
  title: "Ver equipa | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function AddTeamMember() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ver equipa" />
      <TeamPage />
    </div>
  );
}
