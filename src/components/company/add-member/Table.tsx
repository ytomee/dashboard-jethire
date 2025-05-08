"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import moment from "moment";
import { getSession } from "next-auth/react";

interface Invitation {
  name: string;
  email: string;
  role: "admin" | "manager" | "recruiter";
  status: "active" | "expired" | "pending";
  expiresAt: string;
}

export default function AddMemberTable() {
  const [invites, setInvites] = useState<Invitation[]>([]);
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user?.id) {
        setAdminId(session.user.id);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchInvites = async () => {
      if (!adminId) return;
  
      try {
        const res = await fetch(`/api/company/team/invite/list/${adminId}`);
        const data = await res.json();
        setInvites(data.pending);
      } catch (error) {
        console.error("Erro ao carregar convites:", error);
      }
    };
  
    fetchInvites();
  }, [adminId]);

  const getStatusLabel = (invite: Invitation) => {
    if (invite.status === "active") return "Ativo";
    if (invite.status === "pending") {
      const isExpired = moment().isAfter(invite.expiresAt);
      return isExpired ? "Expirado" : "Pendente";
    }
    return "Expirado";
  };

  const getBadgeColor = (invite: Invitation) => {
    const label = getStatusLabel(invite);
    switch (label) {
      case "Ativo":
        return "success";
      case "Pendente":
        return "warning";
      default:
        return "error";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  Nome
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  Função
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  Estado
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {invites.map((invite, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {invite.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {invite.email}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {invite.role === "recruiter"
                  ? "Recrutador"
                  : invite.role === "manager"
                  ? "Gestor"
                  : invite.role === "admin"
                  ? "Administrador"
                  : invite.role}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <Badge size="sm" color={getBadgeColor(invite)}>
                      {getStatusLabel(invite)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="px-5 py-4 text-left text-gray-500 dark:text-gray-400">
                    Nenhum convite encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}