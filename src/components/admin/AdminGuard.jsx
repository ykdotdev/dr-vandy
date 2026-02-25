"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "@/utils/supabase/browser";

export default function AdminGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  const supabaseRef = useRef(null);
  if (!supabaseRef.current) {
    supabaseRef.current = createAuthClient();
  }

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      const { data, error } = await supabaseRef.current.auth.getSession();

      if (!mounted) return;

      if (error || !data?.session) {
        router.replace("/admin-login");
        return;
      }

      if (data.session.user.user_metadata?.role !== "admin") {
        router.replace("/admin-login");
        return;
      }

      setAllowed(true);
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (!allowed) return null;

  return children;
}
