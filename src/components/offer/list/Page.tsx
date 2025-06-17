"use client";

import React, { useState, useEffect } from "react";
import { Trash, Loader, UsersRound } from "@/icons";
import Input from "@/components/form/input/InputField";

interface Offer {
  _id: string;
  role: string;
  level: string;
  type: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  remote: string;
  tags: string[];
  isActive: boolean;
}

export default function ListOfferPage() {

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/offers/list");
        if (!res.ok) throw new Error("Erro ao obter ofertas");
        const data = await res.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  async function toggleOfferStatus(id: string, currentStatus: boolean) {
    try {
      const res = await fetch(`/api/offers/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar estado da oferta");

      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === id ? { ...offer, isActive: !currentStatus } : offer
        )
      );
    } catch (error) {
      console.error("Erro ao alterar estado da oferta:", error);
    }
  }

  const normalize = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const searchText = normalize(search);

  const filteredOffers = offers
  .filter((offer) =>
    normalize(offer.role).includes(searchText) ||
    normalize(offer.type).includes(searchText) ||
    normalize(offer.remote).includes(searchText) ||
    normalize(offer.experience).includes(searchText) ||
    normalize(offer.level).includes(searchText) ||
    (offer.salaryMin && offer.salaryMin.includes(searchText)) ||
    (offer.salaryMax && offer.salaryMax.includes(searchText)) ||
    offer.tags.some((tag) => normalize(tag).includes(searchText))
  )
  .sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1));

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <Input placeholder="Pesquise aqui..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading ? (
        <div className="flex items-center gap-2 mt-6 text-gray-600 dark:text-gray-300">
          <Loader className="animate-spin" />
          <span>A carregar ofertas...</span>
        </div>
      ) : filteredOffers.length === 0 ? (
        <p className="mt-6 text-gray-500 dark:text-gray-400">Não foram encontradas ofertas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
          {filteredOffers.map((offer) => (
            <div key={offer._id} className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-white/[0.05] shadow-sm relative">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {offer.role}
              </h2>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2 capitalize">
                <b className="text-base dark:text-gray-100">Nível:</b> {offer.level}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
                <b className="text-base dark:text-gray-100">Tipo:</b> {{ fulltime: "Tempo inteiro", parttime: "Part-time" }[offer.type]}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2 capitalize">
                <b className="text-base dark:text-gray-100">Modalidade:</b> {{ remote: "Remoto", presencial: "Presencial", hybrid: "Híbrido" }[offer.remote] || "Não definido"}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
                <b className="text-base dark:text-gray-100">Experiência:</b> {{
                  less_than_1: "< 1 ano", "1_to_2": "1 a 2 anos", "2_to_3": "2 a 3 anos",
                  "3_to_4": "3 a 4 anos", "4_to_5": "4 a 5 anos", more_than_5: "> 5 anos"
                }[offer.experience] || "Não definida"}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
                <b className="text-base dark:text-gray-100">Salário:</b>{" "}
                {offer.salaryMin && offer.salaryMax
                  ? `${offer.salaryMin}€ - ${offer.salaryMax}€`
                  : offer.salaryMin
                  ? `${offer.salaryMin}€`
                  : "Não definido"}
              </p>
              <div className="flex flex-wrap gap-2 mb-9">
                {offer.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-brand-100 text-brand-800 dark:bg-brand-800/20 dark:text-brand-300 text-sm font-medium px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 flex items-center gap-3">
                {offer.isActive ? (
                  <span className="bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300 text-sm font-medium px-3 py-1 rounded">
                    Ativo
                  </span>
                ) : (
                  <span className="bg-brand-100 text-brand-800 dark:bg-brand-800/20 dark:text-brand-300 text-sm font-medium px-3 py-1 rounded">
                    Removido
                  </span>
                )}

                <div className="relative group inline-block">
                  <button className="text-dark hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 text-xs font-medium">
                    <UsersRound />
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    Ver candidatos
                  </div>
                </div>

                <div className="relative group inline-block ml-2">
                  <button className="text-dark hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 text-xs font-medium"
                    onClick={() => toggleOfferStatus(offer._id, offer.isActive)}
                  >
                    <Trash />
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    Eliminar
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
