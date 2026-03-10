import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ParkingSpot = {
  id: string;
  code: string;
  type: "PRESA" | "SOLTA";
  status: "AVAILABLE" | "SELECTED";
};

export default async function AdminSpotsPage() {
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

  const isAdmin = profile.role === "ADMIN";

  if (!isAdmin) {
    redirect("/admin");
  }

  const { data: spots, error } = await supabase
    .from("parking_spots")
    .select("id, code, type, status")
    .order("code", { ascending: true });

  if (error) {
    throw new Error("Erro ao carregar vagas.");
  }

  const typedSpots = (spots ?? []) as ParkingSpot[];

  const total = typedSpots.length;
  const available = typedSpots.filter((spot) => spot.status === "AVAILABLE").length;
  const selected = typedSpots.filter((spot) => spot.status === "SELECTED").length;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Painel administrativo</p>
            <h1 className="text-3xl font-bold text-white">Vagas do condomínio</h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Voltar ao painel
            </Link>

            <Link
              href="/live"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Ver painel público
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Total de vagas</p>
            <p className="mt-2 text-4xl font-bold text-white">{total}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Disponíveis</p>
            <p className="mt-2 text-4xl font-bold text-emerald-300">{available}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Escolhidas</p>
            <p className="mt-2 text-4xl font-bold text-rose-300">{selected}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Mapa de vagas</h2>
              <p className="text-sm text-zinc-400">
                Visualização geral das vagas cadastradas no sistema.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                Disponível
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                Escolhida
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {typedSpots.map((spot) => {
              const isAvailable = spot.status === "AVAILABLE";

              return (
                <div
                  key={spot.id}
                  className={[
                    "rounded-2xl border p-4 transition",
                    isAvailable
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-rose-400/20 bg-rose-400/10",
                  ].join(" ")}
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    {spot.type}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">{spot.code}</p>

                  <p
                    className={[
                      "mt-2 text-sm font-medium",
                      isAvailable ? "text-emerald-300" : "text-rose-300",
                    ].join(" ")}
                  >
                    {isAvailable ? "Disponível" : "Escolhida"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
