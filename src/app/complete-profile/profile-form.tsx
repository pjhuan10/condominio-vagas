"use client";

import { useActionState } from "react";
import { saveProfile } from "./_actions/save-profile";

const initialState = {};

export default function CompleteProfileForm() {
  const [state, formAction, pending] = useActionState(saveProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
          Nome completo
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Seu nome"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.07]"
        />
      </div>

      <div>
        <label
          htmlFor="apartment"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Apartamento
        </label>

        <input
          id="apartment"
          name="apartment"
          type="text"
          required
          placeholder="82C"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 uppercase text-white outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.07]"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Use o formato 82C, 101A, 150B.
        </p>
      </div>

      {state?.error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Salvando..." : "Concluir cadastro"}
      </button>
    </form>
  );
}
