"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseAuth";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error || !sessionData?.session) {
        router.replace("/admin-login");
        return;
      }

      const user = sessionData.session.user;
      console.log("Logged-in user metadata:", user.user_metadata);

      if (user.user_metadata?.role !== "admin") {
        router.replace("/admin-login");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return (
            <main className="page-wrapper">
              <ToastProvider>
                {children} {/* All pages/components go here */}
              </ToastProvider>
            </main>
  );
}
