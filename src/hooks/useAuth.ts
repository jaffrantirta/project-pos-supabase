import { useState } from "react";
import { signIn, signUp } from "@/services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      setLoading(false);
      return true; 
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  }

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      await signUp(email, password);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { login, register, loading, error };
}
