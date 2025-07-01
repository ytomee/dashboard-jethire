"use client";

import React, { useState } from "react";
import CompanyListSearch from "@/components/company/list/Search";
import CompanyList from "@/components/company/list/Companies";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-10">
      <CompanyListSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CompanyList  searchTerm={searchTerm} />
    </div>
  );
}
