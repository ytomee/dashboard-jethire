"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useSession } from "next-auth/react";

interface Log {
  _id: string;
  message: string;
  level: "info" | "warn" | "error";
  type: "admin" | "company" | "user" | "system";
  createdAt: string;
}

export default function LogsTable() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/logs");
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error("Erro ao carregar logs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.type === "admin") fetchLogs();
  }, [session]);

  if (session?.user?.type !== "admin") return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px] pt-5">
          <span className="p-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Registo de atividades do sistema
          </span>
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Estado
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Mensagem
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Data
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-sm">
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="px-5 py-4 text-start capitalize">
                    <Badge
                      size="sm"
                      color={
                        log.level === "info"
                          ? "info"
                          : log.level === "warn"
                          ? "warning"
                          : "error"
                      }
                    >
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                    {log.message}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 text-sm dark:text-gray-400">
                    {new Date(log.createdAt).toLocaleString("pt-PT")}
                  </TableCell>
                </TableRow>
              ))}
              {!loading && logs.length === 0 && (
                <TableRow>
                  <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhum log encontrado.
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
