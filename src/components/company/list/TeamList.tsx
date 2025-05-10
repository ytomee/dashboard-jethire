"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface CompanyMember {
  user: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "recruiter";
  pfp?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export default function TeamList() {
  const { data: session } = useSession();
  const [team, setTeam] = useState<CompanyMember[]>([]);
  const [companyPfp, setCompanyPfp] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/company/team/list/${session.user.id}`);
        const data = await res.json();
        setTeam(data.team);
        setCompanyPfp(data.pfp);
      } catch (error) {
        console.error("Erro ao buscar a equipa:", error);
      }
    };

    fetchTeam();
  }, [session?.user?.id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mx-auto py-6">
      {team.length > 0 ? (
        team.map((member, index) => (
          <TeamCard key={index} company={member} companyPfp={companyPfp} />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 col-span-full">
          Nenhum membro encontrado.
        </p>
      )}
    </div>
  );
}

function TeamCard({
  company,
  companyPfp,
}: {
  company: CompanyMember;
  companyPfp: string | null;
}) {
  const profileImage = company.pfp || companyPfp || "/images/default/user.png";

  return (
    <div className="flex flex-col border dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-neutral-700"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {company.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {company.role === "recruiter"
              ? "Recrutador"
              : company.role === "manager"
              ? "Gestor"
              : company.role === "admin"
              ? "Administrador"
              : company.role}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <Info label="Email" value={company.email} />
        <Info label="Telefone" value={company.phone} />
        <Info label="Cidade" value={company.city} />
        <Info label="País" value={company.country} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-500 dark:text-gray-400">{label}:</span>
      <span className="text-gray-800 dark:text-gray-100">{value || "—"}</span>
    </div>
  );
}
