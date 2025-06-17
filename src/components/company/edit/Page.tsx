"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Banner } from "@/components/company/edit/body/Banner";
import { Logo } from "@/components/company/edit/body/Logo";
import { Info } from "@/components/company/edit/body/Info";
import { Contacts } from "@/components/company/edit/body/Contacts";
import { Tags } from "@/components/company/edit/body/Tags";
import { Descriptions } from "@/components/company/edit/body/Descriptions";

import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { PlusIcon } from "@/icons";

export default function CompanyEditPage() {
  const { data: session } = useSession();

  const [banner, setBanner] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const [info, setInfo] = useState({ name: "", slogan: "", city: "", country: "" });
  const [tagsInfo, setTagsInfo] = useState({ remote: "", tags: [] as string[] });
  const [contacts, setContacts] = useState({ address: "", email: "", phone: "" });
  const [descriptions, setDescriptions] = useState<{ title: string; text: string }[]>([]);

  const [originalData, setOriginalData] = useState<{ id?: string; info: typeof info; tagsInfo: typeof tagsInfo; contacts: typeof contacts; descriptions: typeof descriptions; bannerUrl: string | null; logoUrl: string | null; } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/company/profile/get/${session.user.id}`, { method: "GET" });

        if (!res.ok) throw new Error("Erro ao procurar os dados");

        const data = await res.json();
        const fetchedID = data._id || null;
        const fetchedInfo = { name: data.name || "", slogan: data.slogan || "", city: data.city || "", country: data.country || "" };
        const fetchedTagsInfo = { remote: data.remote || "", tags: data.tags || [] };
        const fetchedContacts = { address: data.address || "", email: data.contact?.email || "", phone: data.contact?.phone || "" };
        const fetchedDescriptions = data.description || [];
        const fetchedBanner = data.banner?.secure_url || null;
        const fetchedLogo = data.logo?.secure_url || null;

        setInfo(fetchedInfo);
        setTagsInfo(fetchedTagsInfo);
        setContacts(fetchedContacts);
        setDescriptions(fetchedDescriptions);
        setOriginalData({ id: fetchedID, info: fetchedInfo, tagsInfo: fetchedTagsInfo, contacts: fetchedContacts, descriptions: fetchedDescriptions, bannerUrl: fetchedBanner, logoUrl: fetchedLogo });

      } catch (error) {
        console.error("Erro ao procurar os dados da empresa:", error);
      }
    };

    fetchCompanyData();
  }, [session]);

  useEffect(() => {
    if (showSuccessAlert) {
      setVisible(true);
      const hideTimeout = setTimeout(() => setVisible(false), 3500);
      const removeTimeout = setTimeout(() => setShowSuccessAlert(false), 4000);
      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showSuccessAlert]);

  const arraysEqual = (a: string[], b: string[]): boolean => {
    if (a.length !== b.length) return false;
    return a.every((el, idx) => el === b[idx]);
  };

  const descriptionsEqual = (a: typeof descriptions, b: typeof descriptions) => {
    if (a.length !== b.length) return false;
    return a.every((desc, i) => desc.title === b[i].title && desc.text === b[i].text);
  };

  const hasChanges = () => {
    if (!originalData) return false;
    if (info.name !== originalData.info.name) return true;
    if (info.slogan !== originalData.info.slogan) return true;
    if (info.city !== originalData.info.city) return true;
    if (info.country !== originalData.info.country) return true;

    if (tagsInfo.remote !== originalData.tagsInfo.remote) return true;
    if (!arraysEqual(tagsInfo.tags, originalData.tagsInfo.tags)) return true;

    if (contacts.address !== originalData.contacts.address) return true;
    if (contacts.email !== originalData.contacts.email) return true;
    if (contacts.phone !== originalData.contacts.phone) return true;

    if (!descriptionsEqual(descriptions, originalData.descriptions)) return true;

    if (banner !== null) return true;
    if (logo !== null) return true;

    return false;
  };

  const handleSave = async () => {
    if (!session?.user?.id) {
      console.error("Utilizador não autenticado.");
      return;
    }

    setIsSaving(true);
    setShowSuccessAlert(false);

    const formData = new FormData();
    formData.append("name", info.name);
    if (info.slogan) formData.append("slogan", info.slogan);
    if (info.city) formData.append("city", info.city);
    if (info.country) formData.append("country", info.country);
    if (tagsInfo.remote) formData.append("remote", tagsInfo.remote);

    formData.append("contacts", JSON.stringify(contacts));
    formData.append("tags", JSON.stringify(tagsInfo.tags));
    formData.append("descriptions", JSON.stringify(descriptions));
    if (banner) formData.append("banner", banner);
    if (logo) formData.append("logo", logo);

    try {
      const res = await fetch(`/api/company/profile/edit/${session.user.id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao guardar os dados: ${errorText}`);
      }

      setOriginalData({ info: { ...info }, tagsInfo: { ...tagsInfo }, contacts: { ...contacts }, descriptions: [...descriptions], bannerUrl: originalData?.bannerUrl ?? null, logoUrl: originalData?.logoUrl ?? null});
      setBanner(null);
      setLogo(null);

      setShowSuccessAlert(true);

    } catch (error) {
      console.error("Erro ao enviar para a API:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTag = (tag: string) => {
    setTagsInfo((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleInfoChange = (field: string, value: string) => { setInfo((prev) => ({ ...prev, [field]: value })); };
  const handleContactsChange = (field: string, value: string) => { setContacts((prev) => ({ ...prev, [field]: value })); };
  const handleTagsChange = (field: string, value: string) => { setTagsInfo((prev) => ({ ...prev, [field]: value })); };

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <p className="text-s text-gray-900 dark:text-gray-300 mb-3">
        Pode visualizar o perfil da sua empresa{" "}
        <Link href={`https://jethire.pt/company/${originalData?.id}`} target="_blank" rel="noopener noreferrer" className="underline">aqui</Link>
      </p>

      <div className="grid grid-cols-12 gap-4 mb-8">
        <div className="col-span-12 md:col-span-3">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Logótipo</p>
          <Logo onFileSelected={setLogo} initialPreview={originalData?.logoUrl || null} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Foto de fundo</p>
          <Banner onFileSelected={setBanner} initialPreview={originalData?.bannerUrl || null} />
        </div>
      </div>

      <Info name={info.name} slogan={info.slogan} country={info.country} city={info.city} onChange={handleInfoChange} />
      <Contacts address={contacts.address} email={contacts.email} phone={contacts.phone} onChange={handleContactsChange} />
      <Tags remote={tagsInfo.remote} tags={tagsInfo.tags} onChange={handleTagsChange} onTagChange={toggleTag} />
      <Descriptions descriptions={descriptions} setDescriptions={setDescriptions} />

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          size="sm"
          variant="primary"
          startIcon={<PlusIcon />}
          disabled={!hasChanges() || isSaving}
        >
          {isSaving ? "A guardar..." : "Guardar alterações"}
        </Button>
      </div>

      {showSuccessAlert && (
        <div
          className={`fixed z-[9999] max-w-md transition-all duration-500 ease-in-out
            ${visible ? "opacity-100 bottom-5 left-5" : "opacity-0 bottom-0 left-0"}
          `}
        >
          <Alert
            variant="success"
            title="Alterações guardadas"
            message="O perfil foi atualizado com sucesso."
            showLink={false}
          />
        </div>
      )}
    </div>
  );
}
