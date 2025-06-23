import ChatPage from "@/components/chat/Page";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chat | JetHire",
  description: "Chat de empresas",
};

export default function Chat() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Chat" />
      <ChatPage />
    </div>
  );
}
