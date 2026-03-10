"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialQuery: string;
};

export default function ApartmentSearchForm({ initialQuery }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalized = value.trim().toUpperCase();

    if (!normalized) {
      router.push("/admin/apartments");
      return;
    }

    router.push(`/admin/apartments?q=${encodeURIComponent(normalized)}`);
  }

  function handleClear() {
    setValue("");
    router.push("/admin/apartments");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar apartamento"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.07]"
      />

      <button
        type="submit"
        className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
      >
        Buscar
      </button>

      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Limpar
        </button>
      ) : null}
    </form>
  );
}
