import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import TeamList from "@/components/company/list/TeamList"
import LiveSearchTeamList from "@/components/company/list/Search";

export const metadata: Metadata = {
  title: "Ver equipa | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function AddTeamMember() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Ver equipa" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
        <LiveSearchTeamList />
        <TeamList />
      </div>

    </div>
  );
}
