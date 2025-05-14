import Input from '@/components/form/input/InputField';
import React from "react";
import RefreshButton from "@/components/common/Refresh";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function CompanyRequestsSearch({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="flex items-center mb-6 w-full">
      <div className="flex-grow mr-4">
        <Input
          type="text"
          placeholder="Pode pesquisar aqui..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <RefreshButton />
    </div>
  );
}
