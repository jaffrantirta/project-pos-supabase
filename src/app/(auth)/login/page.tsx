"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
    const router = useRouter();
  const { login, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormInputs) {
    await login(data.email, data.password);
    router.push("/");
    if (!error) {
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <Input type="email" {...register("email")} />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <Input type="password" {...register("password")} />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
