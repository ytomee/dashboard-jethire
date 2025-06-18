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
  
  const isInvalidRange =
    salaryMin !== "" &&
    salaryMax !== "" &&
    Number(salaryMax) <= Number(salaryMin);

  return (
    <div className="col-span-12 md:col-span-5">
      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Salário (€)
      </p>
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Mínimo"
            min={0}
            value={salaryMin}
            onChange={(e) => onChange("salaryMin", e.target.value)}
          />
        </div>
        <span className="text-gray-500">-</span>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Máximo"
            min={salaryMin ? Number(salaryMin) + 1 : 1}
            value={salaryMax}
            onChange={(e) => onChange("salaryMax", e.target.value)}
            disabled={!salaryMin}
          />
        </div>
      </div>

      {isInvalidRange && (
        <p className="text-red-500 text-sm mt-1">
          O salário máximo deve ser superior ao mínimo.
        </p>
      )}
    </div>
  );
}
