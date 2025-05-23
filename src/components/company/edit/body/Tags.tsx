import React from "react";
import Checkbox from "@/components/form/input/Checkbox";
import Radio from "@/components/form/input/Radio";

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

interface Props {
  remote: string;
  tags: string[];
  onChange: (field: string, value: string) => void;
  onTagChange: (value: string) => void;
}

export function Tags({ remote, tags, onChange, onTagChange }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Remote friendly</p>
        <div className="flex flex-wrap items-center gap-8 mt-6">
          <Radio
            id="radio1"
            name="remoteGroup"
            value="false"
            checked={remote === "false"}
            onChange={() => onChange("remote", "false")}
            label="Não"
          />
          <Radio
            id="radio2"
            name="remoteGroup"
            value="yes"
            checked={remote === "yes"}
            onChange={() => onChange("remote", "yes")}
            label="Sim"
          />
        </div>
      </div>

      <div className="col-span-12 md:col-span-10">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</p>
        <div className="flex flex-wrap gap-6">
          {multiOptions.map(option => (
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
    </div>
  );
}
