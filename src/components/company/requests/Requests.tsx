"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "@/icons";
import { CompanyCard } from "@/components/company/requests/list/CompanyCard";
import { ValidateModal } from "@/components/company/requests/list/ValidateModal";
import { RejectModal } from "@/components/company/requests/list/RejectModal";

interface Company {
  _id: string;
  companyName: string;
  nif: string;
  foundedYear: string;
  status: string;
  country: string;
  city: string;
  address: string;
  generalEmail: string;
  phone: string;
  website: string;
  responsiblePerson: string;
  responsibleEmail: string;
  responsiblePhone: string;
}

const statusMap = {
  pending: "Pendente",
  rejected: "Rejeitado",
  approved: "Aprovado",
};

interface Props {
  searchTerm: string;
}

export const Requests = ({ searchTerm }: Props) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/company/requests");
        const data = await response.json();
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error("Resposta inválida:", data);
        }
      } catch (error) {
        console.error("Erro ao carregar empresas:", error);
      }
    };
    fetchCompanies();
  }, []);

  const closeModalWithDelay = (modalSetter: (value: boolean) => void) => {
    setTimeout(() => {
      modalSetter(false);
      setIsLoading(false);
      setSuccessMessage("");
    }, 2000);
  };

  const handleReject = async () => {
    if (selectedCompanyId) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/company/requests/reject/${selectedCompanyId}`, {
          method: "PATCH",
        });
        if (response.ok) {
          setCompanies(prev =>
            prev.map(c => c._id === selectedCompanyId ? { ...c, status: "rejected" } : c)
          );
          setSuccessMessage("Empresa removida com sucesso!");
          closeModalWithDelay(setIsRejectModalOpen);
        } else {
          console.error("Erro ao rejeitar empresa.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro na operação de rejeição:", error);
        setIsLoading(false);
      }
    }
  };

  const handleValidate = async () => {
    if (selectedCompanyId) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/company/requests/validate/${selectedCompanyId}`, {
          method: "PATCH",
        });
        if (response.ok) {
          setCompanies(prev =>
            prev.map(c => c._id === selectedCompanyId ? { ...c, status: "approved" } : c)
          );
          setSuccessMessage("Empresa validada com sucesso!");
          closeModalWithDelay(setIsValidateModalOpen);
        } else {
          console.error("Erro ao validar empresa.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro na operação de validação:", error);
        setIsLoading(false);
      }
    }
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    const order = { pending: 0, approved: 1, rejected: 2 };
    return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
  });

  const filteredCompanies = sortedCompanies.filter((company) => {
    const valuesToSearch = [
      company.companyName,
      company.nif,
      company.foundedYear.toString(),
      company.status,
      company.country,
      company.city,
      company.address,
      company.generalEmail,
      company.phone,
      company.website,
      company.responsiblePerson,
      company.responsibleEmail,
      company.responsiblePhone,
    ];

    return valuesToSearch.some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {companies.length === 0 ? (
        <p className="text-dark dark:text-white flex items-center gap-2">
          <Loader className="animate-spin" /> A carregar empresas...
        </p>
      ) : filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            statusMap={statusMap}
            onValidate={() => {
              setSelectedCompanyId(company._id);
              setIsValidateModalOpen(true);
            }}
            onReject={() => {
              setSelectedCompanyId(company._id);
              setIsRejectModalOpen(true);
            }}
          />
        ))
      ) : (
        <p className="text-dark dark:text-white">Nenhuma empresa encontrada.</p>
      )}

      <ValidateModal
        isOpen={isValidateModalOpen}
        onClose={() => setIsValidateModalOpen(false)}
        onValidate={handleValidate}
        isLoading={isLoading}
        successMessage={successMessage}
      />

      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
        isLoading={isLoading}
        successMessage={successMessage}
      />
    </div>
  );
};
