"use client";

import React from "react";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";

const levelOptions = [
  { value: "entry", label: "Entry" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "manager", label: "Manager" },
  { value: "experienced", label: "Experienced (Non - Manager)" },
];

interface FunctionAndLevelProps {
  role: string;
  level: string;
  onChange: (field: string, value: string) => void;
}

export default function FunctionAndLevel({ role, level, onChange }: FunctionAndLevelProps) {
  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Função</p>
        <Input required placeholder="Full-Stack Developer" value={role} onChange={e => onChange("role", e.target.value)} />
      </div>

      <div className="col-span-12 md:col-span-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nível</p>
        <div className="relative">
          <Select
            required
            options={levelOptions}
            placeholder="Selecionar"
            value={level || undefined}
            onChange={(e) => onChange("level", e ?? "")}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>
      </div>
    </>
  );
}