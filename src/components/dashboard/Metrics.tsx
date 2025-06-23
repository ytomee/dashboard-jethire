"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Briefcase, UsersRound, Building2, UserRoundSearch } from "@/icons";

interface AdminMetrics {
  users: number;
  companies: number;
  offers: number;
}

interface CompanyMetrics {
  team: number;
  offers: number;
  candidates: number;
}

export const Metrics = () => {
  const { data: session } = useSession();
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);
  const [companyMetrics, setCompanyMetrics] = useState<CompanyMetrics | null>(null);

  const type = session?.user?.type;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        if (type === "admin") {
          const res = await fetch("/api/dashboard/admin/metrics");
          const data = await res.json();
          setAdminMetrics(data);
        } else if (type === "company") {
          const res = await fetch("/api/dashboard/company/metrics");
          const data = await res.json();
          setCompanyMetrics(data);
        }
      } catch (err) {
        console.error("Erro ao buscar métricas:", err);
      }
    };

    fetchMetrics();
  }, [type]);

  return (
    <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
      {/* Utilizadores ou Equipa */}
      {(type === "admin" || type === "company") && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <UsersRound className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {type === "admin" ? "Utilizadores" : "Equipa"}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {type === "admin"
                  ? adminMetrics?.users ?? "—"
                  : companyMetrics?.team ?? "—"}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* Empresas / Ofertas */}
      {(type === "admin" || type === "company") && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {type === "admin" ? <Building2 className="text-gray-800 dark:text-white/90" /> : <UserRoundSearch className="text-gray-800 dark:text-white/90" /> } 
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {type === "admin" ? "Empresas" : "Candidatos"}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {type === "admin"
                  ? adminMetrics?.companies ?? "—"
                  : companyMetrics?.candidates ?? "—"}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* Ofertas */}
      {(type === "admin" || type === "company") && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Briefcase className="text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Ofertas</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {type === "admin"
                  ? adminMetrics?.offers ?? "—"
                  : companyMetrics?.offers ?? "—"}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
