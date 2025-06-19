"use client";

import Input from "@/components/form/input/InputField";
import { Loader, ChevronLeftIcon, EyeIcon, EyeCloseIcon } from "@/icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Candidate {
  _id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  pfp: string;
  profileUrl: string;
  isSeen: boolean;
}

export default function CandidatesPage() {
  const { id } = useParams();
  const offerId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!offerId) {
      setLoading(false);
      return;
    }

    async function fetchCandidates() {
      try {
        const res = await fetch(`/api/offers/candidates?id=${offerId}`);
        if (!res.ok) throw new Error("Erro ao buscar candidatos");
        const data = await res.json();
        setCandidates(data.candidates || []);
      } catch (err) {
        console.error(err);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, [offerId]);

  const filtered = candidates.filter((c) =>
    [c.name, c.role, c.city, c.phone, c.email, c.country].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <div className="mb-3">
        <Link
            href="/offer/list"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
        >
            <ChevronLeftIcon
            className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
            />
            Voltar atrás
        </Link>
        </div>
      <Input
        type="text"
        placeholder="Procurar candidato..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 flex gap-2"><Loader className="animate-spin" />A carregar candidatos...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Nenhum candidato encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((candidate) => (
            <div
              key={candidate._id}
              className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              {candidate.isSeen && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-gray-900/90 text-white text-lg font-medium opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  Visto
                </div>
              )}

              <div className="absolute top-3 right-3 group/tooltip">
                <button
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  onClick={async () => {
                    const res = await fetch("/api/offers/seen", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ offerId, userId: candidate._id }),
                    });

                    const data = await res.json();
                    if (res.ok) {
                      setCandidates((prev) =>
                        prev.map((c) =>
                          c._id === candidate._id ? { ...c, isSeen: data.isSeen } : c
                        )
                      );
                    } else {
                      alert("Erro ao marcar como visto");
                    }
                  }}
                >
                 {candidate.isSeen ? <EyeCloseIcon/> : <EyeIcon/>}
                </button>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-30 whitespace-nowrap">
                  {candidate.isSeen ? "Desmarcar como visto" : "Marcar como visto"}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  width={60}
                  height={60}
                  src={candidate.pfp}
                  alt={candidate.name}
                  className="h-16 w-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {candidate.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{candidate.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.city}, {candidate.country}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Telefone:</strong> {candidate.phone}</p>
              </div>

              <a
                href={candidate.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
              >
                Ver Perfil
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
