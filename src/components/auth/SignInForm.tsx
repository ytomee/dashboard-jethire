"use client";
import { useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon, Loader } from "@/icons";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const res = await signIn("credentials", {
      user,
      pass,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage(res.error || "Erro ao autenticar");
      setLoading(false);
    } else {
      let tries = 0;
      const maxTries = 10;
    
      const waitForSession = async () => {
        const session = await getSession();
        if (session || tries >= maxTries) {
          window.location.href = "/";
        } else {
          tries++;
          setTimeout(waitForSession, 300);
        }
      };
      waitForSession();
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Seja bem-vindo!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Coloque as credenciais para iniciar sessão.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Utilizador <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="jethire"
                  type="text"
                  value={user}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Palavra-passe <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Insira a palavra-passe"
                    value={pass}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full" size="sm" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader className="mr-1 animate-spin" />
                      A entrar...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-3 text-error-600 text-md">
              {errorMessage}
            </div>
          )}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Tem um token de acesso?{" "}
              <Link
                href="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Entre por aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
