"use client";

import { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import { Loader } from "@/icons";

interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export default function InboxPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filtered, setFiltered] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact/list");
        const data = await res.json();
        setContacts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Erro ao carregar contactos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filteredList = contacts.filter((c) =>
      [c.name, c.email, c.phone ,c.message, c.company].some((field) =>
        field?.toLowerCase().includes(lower)
      )
    );
    setFiltered(filteredList);
  }, [search, contacts]);

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
        placeholder="Pesquisar por nome, email ou mensagem..."
      />

      {loading ? (
        <div className="flex gap-1 dark:text-gray-300">
          <Loader className="animate-spin" /> A carregar mensagens...
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma mensagem encontrada.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((contact) => (
            <li
              key={contact._id}
              className="rounded-lg border border-gray-300 px-5 py-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-white/[0.02]"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xl font-semibold text-brand dark:text-white">
                  {contact.name}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-100 mb-2">
                <strong>Email:</strong> {contact.email}
              </p>
              {contact.company && (
                <p className="text-sm text-gray-600 dark:text-gray-100 mb-2">
                  <strong>Empresa:</strong> {contact.company}
                </p>
              )}
              {contact.phone && (
                <p className="text-sm text-gray-600 dark:text-gray-100 mb-2">
                  <strong>Telefone:</strong> {contact.phone}
                </p>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-100 mt-2">
                <strong>Mensagem:</strong> {contact.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
