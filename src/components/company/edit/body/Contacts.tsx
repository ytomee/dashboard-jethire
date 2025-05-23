import React from "react";
import Input from "@/components/form/input/InputField";

interface Props {
  address: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export function Contacts({ address, email, phone, onChange }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-6">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Morada completa</p>
        <Input
          value={address}
          onChange={e => onChange("address", e.target.value)}
          placeholder="Rua, número, andar, código postal"
        />
      </div>

      <div className="col-span-12 md:col-span-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email da empresa</p>
        <Input
          type="email"
          value={email}
          onChange={e => onChange("email", e.target.value)}
          placeholder="email@empresa.com"
        />
      </div>

      <div className="col-span-12 md:col-span-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Telefone</p>
        <Input
          type="tel"
          value={phone}
          onChange={e => onChange("phone", e.target.value)}
          placeholder="+351 912 345 678"
        />
      </div>
    </div>
  );
}
