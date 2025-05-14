import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import AddMemberTable from "@/components/team/add-member/Table";
import AddMemberForm from "@/components/team/add-member/Form";

export const metadata: Metadata = {
  title: "Adicionar membros | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function AddTeamMember() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Adicionar membros" />

      <div className="min-h-screen space-y-6 rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-10">
        <AddMemberForm />
        <AddMemberTable />
      </div>
    </div>
  );
}
