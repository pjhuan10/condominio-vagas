import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CompleteProfileForm from "./profile-form";

export default async function CompleteProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users_profiles")
    .select("id, apartment_id, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.apartment_id) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_25%)]" />

      <div className="relative w-full max-w-xl rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm text-zinc-400 transition hover:text-white"
        >
          ← Voltar
        </Link>

        <div className="mb-6">
          <div className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-300">
            Complete seu cadastro
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white">
            Vincular apartamento
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Informe seu nome e seu apartamento no formato 82C para acessar o sistema.
          </p>
        </div>

        <CompleteProfileForm />

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs leading-5 text-zinc-500">
            Cada apartamento pode ser vinculado a apenas um morador.
          </p>
        </div>
      </div>
    </main>
  );
}
