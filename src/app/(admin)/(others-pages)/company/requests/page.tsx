import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Requests } from "@/components/company/Requests";
import { Metadata } from "next";
import Input from '@/components/form/input/InputField';
import React from "react";
import RefreshButton from "@/components/common/Refresh";

export const metadata: Metadata = {
  title: "Registo de Empresas | JetHire",
  description: "Lista de empresas pendentes para validação.",
};

export default function CompanyRequests() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Registos de empresas" />
      <div className="min-h-screen space-y-6 rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-10">
        
        <div className="flex items-center mb-6 w-full">
          <div className="flex-grow mr-4">
            <Input type="text" placeholder="Pode pesquisar aqui..." className="w-full" />
          </div>
          <RefreshButton />
        </div>
        
        <Requests />
        
      </div>
    </div>
  );
}
