// components/offer/add/TypeAndExperience.tsx
"use client";

import React from "react";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";

const typeOptions = [
  { value: "fulltime", label: "Tempo inteiro" },
  { value: "parttime", label: "Part-time" },
  { value: "internship", label: "Estágio"},
];

const experienceOptions = [
  { value: "less_than_1", label: "< 1 ano" },
  { value: "1_to_2", label: "1-2 anos" },
  { value: "2_to_3", label: "2-3 anos" },
  { value: "3_to_4", label: "3-4 anos" },
  { value: "4_to_5", label: "4-5 anos" },
  { value: "more_than_5", label: "> 5 anos" },
];

interface TypeAndExperienceProps {
  type: string;
  experience: string;
  onChange: (field: string, value: string) => void;
}

export default function TypeAndExperience({ type, experience, onChange }: TypeAndExperienceProps) {
  return (
    <>
      <div className="col-span-12 md:col-span-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tipo</p>
        <div className="relative">
          <Select
            required
            options={typeOptions}
            placeholder="Selecionar"
            value={type}
            onChange={(e) => onChange("type", e || "")}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Experiência</p>
        <div className="relative">
          <Select
            options={experienceOptions}
            placeholder="Selecionar"
            value={experience}
            onChange={(e) => onChange("experience", e || "")}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>
      </div>
    </>
  );
}