import Link from "next/link";

export default function LivePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Painel público</p>
            <h1 className="text-3xl font-bold text-white">Escolha de vagas ao vivo</h1>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Voltar
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400">Apartamento em chamada</p>
                <h2 className="mt-2 text-5xl font-bold text-white">1204</h2>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                AO VIVO
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Tempo restante</p>
                <p className="mt-2 text-3xl font-bold text-white">02:41</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Grupo atual</p>
                <p className="mt-2 text-3xl font-bold text-white">Prioridade</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-400">Vagas restantes</p>
                <p className="mt-2 text-3xl font-bold text-white">148</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-zinc-400">Próximos apartamentos</p>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {["907", "1402", "305", "1008", "601", "1503"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Aguardando
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-sm text-zinc-400">Últimas escolhas</p>

            <div className="mt-4 space-y-3">
              {[
                { apartment: "1102", spot: "Vaga 27" },
                { apartment: "803", spot: "Vaga 19" },
                { apartment: "402", spot: "Vaga 11" },
                { apartment: "1501", spot: "Vaga 07" },
              ].map((item) => (
                <div
                  key={`${item.apartment}-${item.spot}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-xs text-zinc-500">Escolha confirmada</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Apto {item.apartment}
                  </p>
                  <p className="text-sm text-zinc-400">{item.spot}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
