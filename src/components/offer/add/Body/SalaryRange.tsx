"use client";

import React from "react";
import Input from "@/components/form/input/InputField";

export default function SalaryRange({
  salaryMin,
  salaryMax,
  onChange,
}: {
  salaryMin: string;
  salaryMax: string;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="col-span-12 md:col-span-5">
      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Salário (€)</p>
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1">
          <Input
            placeholder="Mínimo"
            value={salaryMin}
            onChange={(e) => onChange("salaryMin", e.target.value)}
          />
        </div>
        <span className="text-gray-500">-</span>
        <div className="flex-1">
          <Input
            placeholder="Máximo"
            value={salaryMax}
            onChange={(e) => onChange("salaryMax", e.target.value)}
            disabled={!salaryMin}
          />
        </div>
      </div>
    </div>
  );
}
