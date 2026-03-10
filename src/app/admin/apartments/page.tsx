import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ApartmentSearchForm from "./_components/apartment-search-form";

type SearchParams = Promise<{
  q?: string;
}>;

type Apartment = {
  id: string;
  number: string;
  block: string | null;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  is_priority: boolean | null;
  priority_type: string | null;
};

export default async function AdminApartmentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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

  if (profile.role !== "ADMIN") {
    redirect("/admin");
  }

  const params = await searchParams;
  const query = params.q?.trim().toUpperCase() ?? "";

  let apartmentsQuery = supabase
    .from("apartments")
    .select(
      "id, number, block, owner_name, email, phone, is_priority, priority_type"
    )
    .order("number", { ascending: true });

  if (query) {
    apartmentsQuery = apartmentsQuery.ilike("number", `%${query}%`);
  }

  const { data: apartments, error } = await apartmentsQuery;

  if (error) {
    throw new Error("Erro ao carregar apartamentos.");
  }

  const typedApartments = (apartments ?? []) as Apartment[];

  const total = typedApartments.length;
  const priorityCount = typedApartments.filter((item) => item.is_priority).length;
  const linkedCount = typedApartments.filter((item) => item.owner_name).length;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Painel administrativo</p>
            <h1 className="text-3xl font-bold text-white">Apartamentos</h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Voltar ao painel
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Total de apartamentos</p>
            <p className="mt-2 text-4xl font-bold text-white">{total}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Prioritários</p>
            <p className="mt-2 text-4xl font-bold text-amber-300">{priorityCount}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Com morador vinculado</p>
            <p className="mt-2 text-4xl font-bold text-indigo-300">{linkedCount}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Lista de apartamentos</h2>
              <p className="text-sm text-zinc-400">
                Busque por número do apartamento, como 82C ou 101A.
              </p>
            </div>

            <ApartmentSearchForm initialQuery={query} />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-5 gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium text-zinc-300">
              <div>Apartamento</div>
              <div>Bloco</div>
              <div>Prioridade</div>
              <div>Morador</div>
              <div>Contato</div>
            </div>

            <div className="divide-y divide-white/10">
              {typedApartments.length === 0 ? (
                <div className="px-6 py-8 text-sm text-zinc-400">
                  Nenhum apartamento encontrado.
                </div>
              ) : (
                typedApartments.map((apartment) => (
                  <div
                    key={apartment.id}
                    className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-zinc-200"
                  >
                    <div className="font-semibold text-white">
                      Apto {apartment.number}
                    </div>

                    <div>{apartment.block ?? "-"}</div>

                    <div>
                      {apartment.is_priority ? (
                        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                          {apartment.priority_type || "Prioritário"}
                        </span>
                      ) : (
                        <span className="text-zinc-500">Não</span>
                      )}
                    </div>

                    <div>{apartment.owner_name ?? "-"}</div>

                    <div className="text-zinc-400">
                      {apartment.email ?? apartment.phone ?? "-"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
