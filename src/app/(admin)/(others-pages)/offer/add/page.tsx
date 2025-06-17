import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddOfferPage from "@/components/offer/add/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Adicionar oferta | JetHire",
  description: "Adicionar oferta de emprego",
};

export default function ProfilePage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Adicionar oferta" />
      <AddOfferPage />
    </div>
  );
}
