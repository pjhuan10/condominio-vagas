import Link from "next/link";

export default function AdminDrawPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Painel administrativo</p>
            <h1 className="text-3xl font-bold text-white">Ordem do sorteio</h1>
          </div>

          <Link
            href="/admin"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Voltar
          </Link>
        </div>

        <p className="mt-6 text-zinc-300">
          Esta tela será a próxima etapa: gerar e visualizar a ordem de chamada.
        </p>
      </div>
    </main>
  );
}
