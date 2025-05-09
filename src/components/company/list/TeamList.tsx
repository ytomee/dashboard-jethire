"use client";

import React from "react";

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
  const team: CompanyMember[] = [
    {
      user: "ana.costa",
      name: "Ana Costa",
      email: "ana@empresa.pt",
      role: "manager",
      pfp: "https://randomuser.me/api/portraits/women/44.jpg",
      city: "Lisboa",
      country: "Portugal",
      phone: "912345678",
    },
    {
      user: "joao.silva",
      name: "João Silva",
      email: "joao@empresa.pt",
      role: "recruiter",
      pfp: "https://randomuser.me/api/portraits/men/32.jpg",
      city: "Porto",
      country: "Portugal",
      phone: "913456789",
    },
    {
      user: "maria.sousa",
      name: "Maria Sousa",
      email: "maria@empresa.pt",
      role: "admin",
      pfp: "https://randomuser.me/api/portraits/women/55.jpg",
      city: "Coimbra",
      country: "Portugal",
      phone: "914567890",
    },
    {
      user: "carlos.ferreira",
      name: "Carlos Ferreira",
      email: "carlos@empresa.pt",
      role: "recruiter",
      pfp: "https://randomuser.me/api/portraits/men/21.jpg",
      city: "Braga",
      country: "Portugal",
      phone: "915678901",
    },
    {
      user: "sofia.matos",
      name: "Sofia Matos",
      email: "sofia@empresa.pt",
      role: "manager",
      pfp: "https://randomuser.me/api/portraits/women/36.jpg",
      city: "Faro",
      country: "Portugal",
      phone: "916789012",
    },
    {
      user: "tiago.lopes",
      name: "Tiago Lopes",
      email: "tiago@empresa.pt",
      role: "admin",
      pfp: "https://randomuser.me/api/portraits/men/45.jpg",
      city: "Setúbal",
      country: "Portugal",
      phone: "917890123",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mx-auto py-6">
      {team.map((member, index) => (
        <TeamCard key={index} company={member} />
      ))}
    </div>
  );
}


function TeamCard({ company }: { company: CompanyMember }) {
  return (
    <div className="flex flex-col border dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6">
      {/* Parte superior: Imagem + nome + função */}
      <div className="flex items-center gap-4">
        <img
          src={company.pfp || "/default-pfp.png"}
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

      {/* Parte inferior: Contactos e localização */}
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
