import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { ToastProvider } from "@/components/ToastProvider";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies(); // ✅ MUST await
  const accessToken = cookieStore.get("sb-access-token")?.value;

  if (!accessToken) {
    redirect("/admin-login");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

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
