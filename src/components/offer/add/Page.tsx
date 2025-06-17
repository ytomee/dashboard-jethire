"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Tags } from "@/components/offer/add/Body/Tags";
import { Descriptions } from "@/components/offer/add/Body/Descriptions";
import FunctionAndLevel from "@/components/offer/add/Body/FunctionAndLevel";
import TypeAndExperience from "@/components/offer/add/Body/TypeAndExperience";
import SalaryRange from "@/components/offer/add/Body/SalaryRange";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { FilePlus2 } from "@/icons";

export default function AddOfferPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    level: "",
    type: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    remote: "",
    tags: [] as string[],
    description: [] as { title: string; text: string }[],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleDescriptionChange = (list: { title: string; text: string }[]) => {
    setFormData((prev) => ({ ...prev, description: list }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/offers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.error("Erro ao criar a oferta");
      return;
    }

    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    router.push("/offers/list");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8"
      >
        <div className="grid grid-cols-12 gap-4 mb-8">
          <FunctionAndLevel
            role={formData.role}
            level={formData.level}
            onChange={handleChange}
          />

          <TypeAndExperience
            type={formData.type}
            experience={formData.experience}
            onChange={handleChange}
          />

          <SalaryRange
            salaryMin={formData.salaryMin}
            salaryMax={formData.salaryMax}
            onChange={handleChange}
          />

          <Tags
            tags={formData.tags}
            remote={formData.remote}
            onChange={handleChange}
            onTagChange={handleTagsChange}
          />

          <Descriptions
            description={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="flex justify-end">
          <Button size="sm" variant="primary" startIcon={<FilePlus2 />}>
            Publicar oferta
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        showCloseButton={true}
        isFullscreen={false}
        className="max-w-[450px]"
      >
        <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
          <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center">
            A oferta foi criada com sucesso!
          </p>
        </div>
      </Modal>
    </>
  );
}
