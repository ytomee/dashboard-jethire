"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { Loader } from "@/icons";

interface User {
  _id: string;
  name: string;
  email: string;
  profile: {
    city?: string;
    country?: string;
    role?: string;
    pfp?: string;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/list");
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.profile?.role?.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, users]);

  const openRemoveModal = (user: User) => {
    setUserToRemove(user);
    setIsModalOpen(true);
  };

  const handleRemove = async () => {
    if (!userToRemove) return;

    try {
      await fetch(`/api/user/delete/${userToRemove._id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u._id !== userToRemove._id));
      setFilteredUsers(filteredUsers.filter((u) => u._id !== userToRemove._id));
      setIsModalOpen(false);
      setUserToRemove(null);
    } catch (error) {
      console.error("Erro ao remover utilizador:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseButton={true}
        isFullscreen={false}
        className="max-w-[450px]"
      >
        <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
          <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center mb-5 mt-10">
            Tem a certeza que quer remover <strong>{userToRemove?.name}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <Button className="bg-gray-700 flex-1" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button className="flex-1" onClick={handleRemove}>Remover</Button>
          </div>
        </div>
      </Modal>

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
        <Input
          className="mb-8"
          placeholder="Pesquisar por nome, email ou função..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <div className="text-gray-700 dark:text-gray-300 text-md flex gap-2">
            <Loader className="animate-spin" /> A carregar utilizadores...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-5 flex flex-col justify-between gap-4 hover:shadow-lg transition border-1 border-gray-300 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <Image
                    height={60}
                    width={60}
                    src={user.profile?.pfp || "/images/default/user.png"}
                    alt="Foto de perfil"
                    className="w-20 h-20 rounded-full object-cover border-3 border-brand"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {user.profile?.role || "Sem função"}
                    </p>
                    {(user.profile?.city || user.profile?.country) && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {[user.profile?.city, user.profile?.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 gap-2">
                  <Link
                    href={`https://jethire.pt/profile/${user._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-xl bg-brand text-dark dark:text-white dark:bg-brand-dark hover:opacity-90"
                  >
                    Ver Perfil
                  </Link>
                  <button
                    className="text-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    onClick={() => openRemoveModal(user)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
