"use client";

import React from "react";
import Checkbox from "@/components/form/input/Checkbox";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";

const multiOptions = [
  { value: "1", text: "Desenvolvimento" },
  { value: "2", text: "Redes" },
  { value: "3", text: "Cibersegurança" },
  { value: "4", text: "Dados & IA" },
  { value: "5", text: "Suporte Técnico" },
  { value: "6", text: "Hardware & IoT" },
  { value: "7", text: "Cloud" },
  { value: "8", text: "Marketing" },
  { value: "9", text: "UI & UX" },
  { value: "10", text: "Consultoria" },
  { value: "11", text: "E-Commerce" },
];

const modalOptions = [
  { value: "presencial", label: "Presencial" },
  { value: "remote", label: "Remoto" },
  { value: "hybrid", label: "Híbrido" },
];

interface TagsProps {
  remote: string;
  tags: string[];
  onChange: (field: string, value: string) => void;
  onTagChange: (value: string) => void;
}

export function Tags({ remote, tags, onChange, onTagChange }: TagsProps) {
  return (
    <>
      <div className="col-span-12 md:col-span-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Modalidade</p>
        <div className="relative">
          <Select
            options={modalOptions}
            placeholder="Selecionar"
            value={remote}
            onChange={(val) => onChange("remote", val)}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-9">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</p>
        <div className="flex flex-wrap gap-6">
          {multiOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox
                checked={tags.includes(option.text)}
                onChange={() => onTagChange(option.text)}
              />
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                {option.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
