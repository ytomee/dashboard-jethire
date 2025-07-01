"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@/icons";
import CompanyCard from "@/components/company/list/CompanyCard";

interface Company {
  name: string;
  slogan: string;
  city: string;
  country: string;
  address: string;
  foundationYear: string;
  logo: {
    secure_url: string;
    public_id: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export default function CompanyList({ searchTerm }: { searchTerm: string }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/company/list");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

    const filteredCompanies = companies.filter((company) => {
        const valuesToSearch = [
            company.name,
            company.slogan,
            company.city,
            company.country,
            company.address,
            company.foundationYear,
            company.contact.email,
            company.contact.phone,
            company.contact.website,
        ];

        return valuesToSearch.some((value) =>
            value?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mx-auto py-1">
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 col-span-full flex items-center gap-2">
          <Loader className="animate-spin" /> A carregar empresas ...
        </p>
      ) : filteredCompanies.length > 0 ? (
        filteredCompanies.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 col-span-full">
          Nenhuma empresa encontrada.
        </p>
      )}
    </div>
  );
}
