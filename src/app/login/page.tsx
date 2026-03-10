"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const redirectTo = `${window.location.origin}/auth/callback?next=/complete-profile`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Link de acesso enviado para seu e-mail.");
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_25%)]" />

      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm text-zinc-400 transition hover:text-white"
        >
          ← Voltar
        </Link>

        <div className="mb-6">
          <div className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-300">
            Acesso seguro
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white">Entrar</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Informe seu e-mail para receber o link de acesso ao sistema.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.07]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Receber link"}
          </button>
        </form>

        {message ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            {message}
          </div>
        ) : null}

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs leading-5 text-zinc-500">
            Você receberá um link por e-mail e concluirá o cadastro informando seu apartamento.
          </p>
        </div>
      </div>
    </main>
  );
}
