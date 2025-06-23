import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InboxPage from "@/components/inbox/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Caixa de entrada | JetHire",
  description: "Caixa de entrada",
};

export default function ProfilePage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Caixa de entrada" />
      <InboxPage />
    </div>
  );
}
