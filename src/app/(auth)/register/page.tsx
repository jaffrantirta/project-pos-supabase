"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validators/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
      const router = useRouter();
  const { register: registerUser, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormInputs) {
    await registerUser(data.email, data.password);
    router.push("/login");

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

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

      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <Input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
