"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Loader } from "@/icons";

import UserMetaCard from "@/components/user-profile/UserMetaCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserAddressCard from "@/components/user-profile/UserAddressCard";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

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
  }, [id, router]);

  if(!user) return;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Perfil
        </h3>
        <div className="space-y-6">
          
          {loading && (
            <div className="dark:text-white flex items-center gap-2">
              <Loader className="animate-spin" /> A carregar perfil...
            </div>
          )}

          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
          <UserAddressCard user={user} />

        </div>
      </div>
    </div>
  );
}
