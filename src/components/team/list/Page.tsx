"use client";

import React, { useState } from "react";
import TeamList from "@/components/team/list/TeamList";
import LiveSearchTeamList from "@/components/team/list/Search";

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <LiveSearchTeamList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TeamList searchTerm={searchTerm} />
    </div>
  );
}
