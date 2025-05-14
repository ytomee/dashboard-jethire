"use client";

import React, { useState } from "react";
import CompanyRequestsSearch from "@/components/company/requests/Search";
import { Requests } from "@/components/company/requests/Requests";

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen space-y-6 rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-10">
      <CompanyRequestsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Requests  searchTerm={searchTerm} />
    </div>
  );
}
