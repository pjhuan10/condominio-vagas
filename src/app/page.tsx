import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_22%)]" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              Sistema digital para escolha de vagas
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-white md:text-6xl">
              Condomínio Vagas
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Plataforma moderna para sorteio da ordem de chamada e escolha de vagas ao vivo,
              com transparência, cronômetro e acompanhamento em tempo real.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Entrar no sistema
              </Link>

              <Link
                href="/live"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Ver painel ao vivo
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">3 min</p>
                <p className="mt-1 text-sm text-zinc-400">Tempo por escolha</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">Ao vivo</p>
                <p className="mt-1 text-sm text-zinc-400">Escolha em tempo real</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">Seguro</p>
                <p className="mt-1 text-sm text-zinc-400">Registro de cada ação</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="relative rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Evento em destaque</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    Escolha de vagas 2026
                  </h2>
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Pronto para uso
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Apartamento atual</span>
                    <span className="text-sm font-medium text-indigo-300">Prioridade</span>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-white">Apto 1204</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-zinc-400">Cronômetro</p>
                    <p className="mt-2 text-3xl font-bold text-white">02:41</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-zinc-400">Vagas disponíveis</p>
                    <p className="mt-2 text-3xl font-bold text-white">148</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-zinc-400">Próximos da fila</p>
                  <div className="mt-3 space-y-2">
                    {["Apto 907", "Apto 1402", "Apto 305"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-3 py-2"
                      >
                        <span className="text-sm text-zinc-200">{item}</span>
                        <span className="text-xs text-zinc-500">Aguardando</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
