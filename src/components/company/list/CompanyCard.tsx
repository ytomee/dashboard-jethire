"use client";

import React from "react";
import Image from "next/image";

interface Company {
  name: string;
  slogan: string;
  city: string;
  country: string;
  address: string;
  field: string;
  workType: string;
  foundationYear: string;
  pfp: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export default function CompanyCard({ company }: { company: Company }) {
  const logo = company.pfp || "/images/logo/logo-icon.svg";

  return (
    <div className="flex flex-col border dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        <Image
          width={0}
          height={0}
          src={logo}
          alt="Logotipo da empresa"
          className="w-20 h-20 p-3 rounded-full object-cover bg-neutral-100 border border-gray-300 dark:border-neutral-700"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{company.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">{company.slogan}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <Info label="Área" value={company.field} />
        <Info label="Tipo de trabalho" value={company.workType} />
        <Info label="Fundada em" value={company.foundationYear} />
        <Info label="Cidade" value={company.city} />
        <Info label="País" value={company.country} />
        <Info label="Endereço" value={company.address} />
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <Info label="Email" value={company.contact.email} />
        <Info label="Telefone" value={company.contact.phone} />
        <Info label="Website" value={company.contact.website} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-500 dark:text-gray-400">{label}:</span>
      <span className="text-gray-800 dark:text-gray-100 break-words max-w-[60%] text-right">{value || "—"}</span>
    </div>
  );
}
