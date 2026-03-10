import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
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

  if (!profile?.apartment_id) {
    redirect("/complete-profile");
  }

  const { data: apartment } = await supabase
    .from("apartments")
    .select("id, number, block")
    .eq("id", profile.apartment_id)
    .maybeSingle();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Painel administrativo</p>
            <h1 className="text-3xl font-bold text-white">Condomínio Vagas</h1>
          </div>

          <Link
            href="/live"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Ver painel público
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur lg:col-span-2">
            <p className="text-sm text-zinc-400">Conta conectada</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {profile.full_name ?? user.email}
            </h2>
            <p className="mt-2 text-zinc-400">{user.email}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Apartamento</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {apartment?.number ? `Apto ${apartment.number}` : "Pendente"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Perfil</p>
                <p className="mt-2 text-3xl font-bold text-white">{profile.role}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Evento</p>
                <p className="mt-2 text-3xl font-bold text-white">Rascunho</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Ações rápidas</p>

            <div className="mt-4 grid gap-3">
              <Link
                href="/admin/apartments"
                className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:opacity-90"
              >
                Cadastrar apartamentos
              </Link>

              <Link
                href="/admin/spots"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Cadastrar vagas
              </Link>

              <Link
                href="/admin/draw"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Gerar ordem do sorteio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
