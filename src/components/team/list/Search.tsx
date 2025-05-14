"use client";

import React from "react";
import Input from "@/components/form/input/InputField";
import { UserIcon } from "@/icons";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function LiveSearchTeamList({ searchTerm, setSearchTerm }: Props) {

  return (
    <form
      className="mb-2 w-full"
    >
      <div className="relative w-full">
        <Input
          placeholder="Pesquise aqui qualquer informação"
          type="text"
          className="pl-[62px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <UserIcon />
        </span>
      </div>
    </form>
  );
}
