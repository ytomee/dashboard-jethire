"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Loader } from "@/icons";
import UserMetaCard from "@/components/profile/UserMetaCard";
import UserInfoCard from "@/components/profile/UserInfoCard";
import UserAddressCard from "@/components/profile/UserAddressCard";

export default function ProfileClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      router.push("/unauthorized");
      return;
    }

    const id = session.user.id;

    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profile/${id}`);
        if (res.redirected) {
          router.push(res.url);
          return;
        }
        if (!res.ok) throw new Error("Erro ao carregar perfil");
        const data = await res.json();
        setUser(data);
      } catch {
        router.push("/unauthorized");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [session, status, router]);

  if (loading || status === "loading") {
    return (
      <div className="dark:text-white flex items-center gap-2">
        <Loader className="animate-spin" /> A carregar perfil...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Perfil
      </h3>
      <div className="space-y-6">
        <UserMetaCard user={user} />
        <UserInfoCard user={user} />
        <UserAddressCard user={user} />
      </div>
    </div>
  );
}
