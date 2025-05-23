import React from "react";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import countries from "@/utils/country.json";

interface Props {
  name: string;
  slogan: string;
  country: string;
  city: string;
  onChange: (field: string, value: string) => void;
}

const options = countries.map(country => ({
  value: country.nome,
  label: country.nome,
}));

export function Info({
  name,
  slogan,
  country,
  city,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nome da empresa</p>
        <Input
          value={name}
          placeholder="Jet Hire"
          onChange={e => onChange("name", e.target.value)}
        />
      </div>
      <div className="col-span-12 md:col-span-5">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Slogan</p>
        <Input
          value={slogan}
          placeholder="Procura emprego, contrata talentos."
          onChange={e => onChange("slogan", e.target.value)}
        />
      </div>
      <div className="col-span-12 md:col-span-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">País</p>
        <div className="relative">
          <Select
            onChange={value => onChange("country", value)}
            options={options}
            placeholder="Selecionar país"
            className="dark:bg-dark-900"
            value={country}
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>
      </div>
      <div className="col-span-12 md:col-span-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cidade</p>
        <Input
          value={city}
          placeholder="Coimbra"
          onChange={e => onChange("city", e.target.value)}
        />
      </div>
    </div>
  );
}
