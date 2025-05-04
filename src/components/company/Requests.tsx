"use client";
import React, { useEffect, useState } from "react";
import { CircleCheck, CircleX, Award, MapPin, MonitorSmartphone, UserRoundSearch } from "@/icons";

export const Requests = () => {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/company/requests');
        const data = await response.json();

        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error('A resposta não é uma lista válida de empresas', data);
        }
      } catch (error) {
        console.error('Erro ao procurar empresas:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="space-y-6">
      {companies.length > 0 ? (
        companies.map((company, index) => (
          <div key={index} className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">{company.companyName}</h2>

            {/* Dados da Empresa */}
            <div className="mb-6">
              <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><Award className="size-6" />Dados da Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
                <div><span className="font-medium dark:text-white">NIF:</span> {company.nif}</div>
                <div><span className="font-medium dark:text-white">Ano de fundação:</span> {company.yearOfEstablishment}</div>
                <div><span className="font-medium dark:text-white">Estado:</span> {company.status}</div>
                {/* <div><span className="font-medium dark:text-white">Criado a:</span> {new Date(company.createdAt).toLocaleString()}</div> */}
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
              <button className="flex items-center gap-1 rounded-lg bg-neutral-600 px-4 py-2 text-white transition hover:bg-neutral-700">
                <CircleCheck className="size-6" />Validar
              </button>
              <button className="flex items-center gap-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-900">
                <CircleX className="size-6" />Remover
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>A carregar empresas...</p>
      )}
    </div>
  );
};
