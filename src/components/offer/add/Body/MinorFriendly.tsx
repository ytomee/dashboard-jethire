"use client";

import React from "react";
import Checkbox from "@/components/form/input/Checkbox";

interface MinorFriendlyProps {
  isMinorFriendly: boolean;
  onChange: (field: string, value: boolean) => void;
}

export function MinorFriendly({ isMinorFriendly, onChange }: MinorFriendlyProps) {
  return (
    <div className="col-span-12 mt-4">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <Checkbox
          checked={isMinorFriendly}
          onChange={() => onChange("isMinorFriendly", !isMinorFriendly)}
        />
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Aceita menores de 18 anos?
        </span>
      </label>
    </div>
  );
}
