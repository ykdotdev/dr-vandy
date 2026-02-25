// utils/supabase/login.js
import { createAuthClient } from "./supabase/browser";

export async function login(email, password) {
  const supabase = createAuthClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
}
