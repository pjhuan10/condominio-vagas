import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("users_profiles")
      .select("id, apartment_id")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.apartment_id) {
      redirect("/admin");
    }

    redirect("/complete-profile");
  }

  return <LoginForm />;
}
