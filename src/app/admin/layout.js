import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ToastProvider } from "@/components/ToastProvider";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();

  // ✅ Securely verify with Supabase Auth server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin-login");
  }

  if (user.user_metadata?.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <main className="page-wrapper">
      <ToastProvider>{children}</ToastProvider>
    </main>
  );
}
