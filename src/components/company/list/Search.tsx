"use client";

import React from "react";
import Input from "@/components/form/input/InputField";
import { UserIcon } from "@/icons";

export default function LiveSearchTeamList() {

  return (
    <form
      className="mb-2 w-full"
    >
      <div className="relative w-full">
        <Input
          placeholder="Nome"
          type="text"
          className="pl-[62px]"
        />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <UserIcon />
        </span>
      </div>
    </form>
  );
}
