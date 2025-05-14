"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { AddMemberModal } from "@/components/team/add-member/Modal";
import { UserIcon, EnvelopeIcon, ChevronDownIcon, PlusIcon } from "@/icons";
import { getSession } from "next-auth/react";

export default function AddMemberForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("recruiter");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  const options = [
    { value: "recruiter", label: "Recrutador (recomendado)" },
    { value: "manager", label: "Gestor" },
    { value: "admin", label: "Administrador" },
  ];

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user?.id) {
        setAdminId(session.user.id);
      }
    };

    fetchSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !adminId) {
      setModalMessage("Por favor, preencha todos os campos.");
      setIsValidateModalOpen(true);
      return;
    }

    const memberData = { name, email, role };

    try {
      setIsLoading(true);
      const response = await fetch(`/api/company/team/invite/send/${adminId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      if (!response.ok) {
        setModalMessage(data.message || "Ocorreu um erro ao enviar o convite.");
      } else {
        setModalMessage(data.message || "Convite enviado com sucesso!");
        setName("");
        setEmail("");
        setRole("recruiter");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setModalMessage("Erro inesperado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
      setIsValidateModalOpen(true);
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mb-6 w-full md:grid-cols-[2fr_2fr_1.5fr_auto] md:items-center"
      >
        <div className="relative w-full">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            type="text"
            className="pl-[62px]"
          />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <UserIcon />
          </span>
        </div>

        <div className="relative w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="pl-[62px]"
          />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <EnvelopeIcon />
          </span>
        </div>

        <div className="relative w-full">
          <Select
            options={options}
            value={role}
            onChange={handleSelectChange}
            placeholder="Selecionar função"
            className="dark:bg-dark-900"
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>

        <div className="w-full">
          <Button
            size="sm"
            variant="primary"
            className="w-full md:w-auto flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                A enviar...
              </>
            ) : (
              <>
                <PlusIcon />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Modal de Sucesso */}
      <AddMemberModal
        isOpen={isValidateModalOpen}
        onClose={() => setIsValidateModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
}
