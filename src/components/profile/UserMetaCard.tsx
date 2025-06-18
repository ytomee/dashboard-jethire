"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/button/Button";
import { DropzoneComponent } from "../profile/EditPFP";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { getSocialIcon } from "@/utils/socialIcons";

interface UserMetaCardProps {
  user: {
    _id: string;
    companyName: string;
    name: string;
    role: string;
    city: string;
    country: string;
    logo?: {
      secure_url: string;
      public_id: string;
    };
    socials?: {
      platform: string;
      url: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }[];
  };
}

const rolesMap: Record<string, string> = {
  "jethire-admin": "Administrador",
  "admin": "Administrador",
  "manager": "Gestor",
  "recruiter": "Recrutador",
};

export default function UserMetaCard({ user }: UserMetaCardProps) {
  
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      setCanSubmit(false); 
      const timer = setTimeout(() => setCanSubmit(true), 1000);
      return () => clearTimeout(timer); 
    } else {
      setCanSubmit(false);
    }
  }, [selectedFile]);

  const handleSave = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pfp", selectedFile);

    try {
      const res = await fetch(`/api/profile/edit/meta/${user._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao fazer upload da imagem.");

      const data = await res.json();
      console.log("Sucesso:", data);
      closeModal();
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  const readableRole = rolesMap[user.role] || user.role;

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative w-20 h-20 group rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
              <a onClick={openModal} className="block w-full h-full cursor-pointer">
                <Image
                  width={80}
                  height={80}
                  src={user.logo?.secure_url || "/images/default/user.png"}
                  alt="User"
                  className="object-cover w-full h-full transition duration-300 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    className="fill-white"
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    />
                  </svg>
                </div>
              </a>
            </div>

            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.companyName ? `${user.companyName} - ` : ""} {readableRole}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.city}, {user.country}
                </p>
              </div>
            </div>

            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {user.socials?.map(({ platform, url }) => {
                const Icon = getSocialIcon(platform);
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  >
                    <Icon className="fill-current" width={20} height={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[450px] m-4">
        <div className="no-scrollbar relative w-full max-w-[450px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Alterar imagem de perfil
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Por favor, utiliza uma foto de portfólio.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar px-2 pb-3">
              <DropzoneComponent onFileSelected={setSelectedFile} initialPreview={user.logo?.secure_url || null} />
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Fechar
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!selectedFile || !canSubmit}>
                Guardar alterações
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
