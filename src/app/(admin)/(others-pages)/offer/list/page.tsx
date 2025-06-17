import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ListOfferPage from "@/components/offer/list/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ver ofertas | JetHire",
  description: "Ver ofertas de emprego",
};

export default function ProfilePage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Ver ofertas" />
      <ListOfferPage />
    </div>
  );
}
