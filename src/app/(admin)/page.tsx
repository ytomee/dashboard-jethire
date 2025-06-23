import type { Metadata } from "next";
import { Metrics } from "@/components/dashboard/Metrics";
import React from "react";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import UsersChart from "@/components/dashboard/UsersChart";
import OfferChart from "@/components/dashboard/OfferChart";
import LogsTable from "@/components/dashboard/LogsTable";

export const metadata: Metadata = {
  title: "JetHire | Dashboard",
  description: "Página principal da dashboard da Jet Hire",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <Metrics />
      </div>

      <div className="col-span-12 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <UsersChart />
        <OfferChart />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
        <LogsTable />
      </div>
    </div>
  );
}