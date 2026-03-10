"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidApartmentNumber, normalizeApartmentNumber } from "@/lib/apartment";

type ActionState = {
  error?: string;
  success?: string;
};

export async function saveProfile(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const rawApartment = String(formData.get("apartment") ?? "").trim();
  const apartmentNumber = normalizeApartmentNumber(rawApartment);

  if (!name) {
    return { error: "Informe seu nome." };
  }

  if (!apartmentNumber) {
    return { error: "Informe o apartamento." };
  }

  if (!isValidApartmentNumber(apartmentNumber)) {
    return { error: "Formato inválido. Use algo como 82C." };
  }

  const { data: apartment, error: apartmentError } = await supabase
    .from("apartments")
    .select("id, number")
    .eq("number", apartmentNumber)
    .maybeSingle();

  if (apartmentError) {
    return { error: "Erro ao buscar apartamento." };
  }

  if (!apartment) {
    return { error: `Apartamento ${apartmentNumber} não encontrado.` };
  }

  const { data: existingProfileByApartment, error: existingApartmentLinkError } =
    await supabase
      .from("users_profiles")
      .select("id")
      .eq("apartment_id", apartment.id)
      .maybeSingle();

  if (existingApartmentLinkError) {
    return { error: "Erro ao validar vínculo do apartamento." };
  }

  if (existingProfileByApartment && existingProfileByApartment.id !== user.id) {
    return { error: "Este apartamento já está vinculado a outro morador." };
  }

  const { error: upsertError } = await supabase.from("users_profiles").upsert(
    {
      id: user.id,
      apartment_id: apartment.id,
      role: "RESIDENT",
      full_name: name,
    },
    {
      onConflict: "id",
    }
  );

  if (upsertError) {
    return { error: "Não foi possível salvar seu cadastro." };
  }

  redirect("/admin");
}
