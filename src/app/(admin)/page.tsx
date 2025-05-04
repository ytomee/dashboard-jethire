import type { Metadata } from "next";
import { Metrics } from "@/components/dashboard/Metrics";
import React from "react";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import DemographicCard from "@/components/dashboard/DemographicCard";

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
        <MonthlySalesChart />
        <MonthlySalesChart />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>
    </div>
  );
}