"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { PlusIcon, CloseLineIcon } from "@/icons";

interface Description {
  title: string;
  text: string;
}

export function Descriptions({
  description,
  onChange,
}: {
  description: Description[];
  onChange: (updated: Description[]) => void;
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const addDescription = () => {
    if (newTitle.trim() === "" || newText.trim() === "") return;
    const updated = [...description, { title: newTitle.trim(), text: newText.trim() }];
    onChange(updated);
    setNewTitle("");
    setNewText("");
  };

  const removeDescription = (indexToRemove: number) => {
    const updated = description.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  return (
    <>
      <div className="col-span-12 md:col-span-5">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Adicionar descrição</p>
        <Input
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextArea
          placeholder="Insira aqui a descrição..."
          className="mt-3"
          value={newText}
          onChange={setNewText}
        />
        <Button
          className="mt-2"
          onClick={addDescription}
          size="sm"
          variant="primary"
          startIcon={<PlusIcon />}
        >
          Adicionar
        </Button>
      </div>

      <div className="col-span-12 md:col-span-7">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descrições</p>
        {description.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma descrição adicionada.</p>
        )}
        {description.map((desc, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-600 rounded p-3 flex justify-between items-start"
          >
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{desc.title}</h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{desc.text}</p>
            </div>
            <button
              onClick={() => removeDescription(index)}
              aria-label={`Remover descrição ${desc.title}`}
              className="dark:text-white"
              type="button"
            >
              <CloseLineIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
