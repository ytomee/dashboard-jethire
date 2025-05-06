"use client";
import React, { useEffect, useState } from "react";
import {
  CircleCheck,
  CircleX,
  Award,
  MapPin,
  MonitorSmartphone,
  UserRoundSearch,
  Trash,
  Loader
} from "@/icons";
import { Modal } from "../ui/modal";

export const Requests = () => {
  interface Company {
    _id: string;
    companyName: string;
    nif: string;
    foundedYear: number;
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

  return (
    <div className="space-y-6">
      {sortedCompanies.length > 0 ? (
        sortedCompanies.map((company, index) => (
          <div key={index} className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">{company.companyName}</h2>

            {/* Dados da Empresa */}
            <div className="mb-6">
              <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><Award className="size-6" />Dados da Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
                <div><span className="font-medium dark:text-white">NIF:</span> {company.nif}</div>
                <div><span className="font-medium dark:text-white">Ano de fundação:</span> {company.foundedYear}</div>
                <div><span className="font-medium dark:text-white">Estado:</span> {statusMap[company.status as keyof typeof statusMap]}</div>
              </div>
            </div>

            {/* Localização */}
            <div className="mb-6">
              <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><MapPin className="size-6" />Localização</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
                <div><span className="font-medium dark:text-white">País:</span> {company.country}</div>
                <div><span className="font-medium dark:text-white">Cidade:</span> {company.city}</div>
                <div><span className="font-medium dark:text-white">Morada:</span> {company.address}</div>
              </div>
            </div>

            {/* Contactos */}
            <div className="mb-6">
              <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><MonitorSmartphone className="size-6" />Contactos</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
                <div><span className="font-medium dark:text-white">Email geral:</span> {company.generalEmail}</div>
                <div><span className="font-medium dark:text-white">Telefone:</span> {company.phone}</div>
                <div><span className="font-medium dark:text-white">Website:</span> {company.website}</div>
              </div>
            </div>

            {/* Responsável */}
            <div className="mb-6">
              <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><UserRoundSearch className="size-6" />Responsável</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
                <div><span className="font-medium dark:text-white">Nome:</span> {company.responsiblePerson}</div>
                <div><span className="font-medium dark:text-white">Email:</span> {company.responsibleEmail}</div>
                <div><span className="font-medium dark:text-white">Telefone:</span> {company.responsiblePhone}</div>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-4 flex gap-4">
              <button 
                onClick={() => { setSelectedCompanyId(company._id); setIsValidateModalOpen(true); }}
                className="flex items-center gap-1 rounded-lg bg-neutral-600 px-4 py-3 text-white transition hover:bg-neutral-700"
              >
                <CircleCheck className="size-6" />Validar
              </button>
              <button
                onClick={() => { setSelectedCompanyId(company._id); setIsRejectModalOpen(true); }}
                className="flex items-center gap-1 rounded-lg bg-red-500 px-4 py-3 text-white transition hover:bg-red-900"
              >
                <CircleX className="size-6" />Remover
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-dark dark:text-white">A carregar empresas...</p>
      )}

      {/* Modal de Validação */}
      <Modal isOpen={isValidateModalOpen} onClose={() => setIsValidateModalOpen(false)} showCloseButton={true} isFullscreen={false} className="max-w-[450px]">
        <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
          {successMessage ? (
            <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center">{successMessage}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-dark dark:text-white">Validar Empresa?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Tem a certeza que deseja validar esta empresa?</p>
              <div className="flex w-full gap-4 mt-5">
                <button
                  onClick={handleValidate}
                  disabled={isLoading}
                  className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-green-600 hover:bg-green-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
                >
                  {isLoading ? <Loader className="size-6 animate-spin" /> : <CircleCheck className="size-6" />} Validar
                </button>
                <button
                  onClick={() => setIsValidateModalOpen(false)}
                  disabled={isLoading}
                  className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-neutral-600 hover:bg-neutral-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
                >
                  <CircleX className="size-6" />Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Modal de Rejeição */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} showCloseButton={true} isFullscreen={false} className="max-w-[450px]">
        <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
          {successMessage ? (
            <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center">{successMessage}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-dark dark:text-white">Remover Empresa?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Tem a certeza que deseja remover esta empresa?</p>
              <div className="flex w-full gap-4 mt-5">
                <button
                  onClick={handleReject}
                  disabled={isLoading}
                  className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-red-600 hover:bg-red-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
                >
                  {isLoading ? <Loader className="size-6 animate-spin" /> : <Trash className="size-6" />} Remover
                </button>
                <button
                  onClick={() => setIsRejectModalOpen(false)}
                  disabled={isLoading}
                  className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-neutral-600 hover:bg-neutral-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
                >
                  <CircleX className="size-6" />Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};