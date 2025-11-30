"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/api/auth.types";

import { showToast, removeToasts } from "@/components/templates/Toaster";

import useAuthRequest from "@/hooks/auth";
import Layout from "./layout";

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { loginUser } = useAuthRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (formData) => {
    removeToasts();

    setLoading(true);

    try {
      const responseData = await loginUser(formData);

      if (responseData && responseData.access_token) {
        router.replace(`/thesis`);
      } else {
        showToast(responseData?.message, "error");
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-6 bg-app-background rounded-2xl shadow-lg">
        <div className="h-20 flex items-center justify-start border-b border-gray-200 mb-4">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-2" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-content-primary">
              PUP Graduate Thesis Monitoring System
            </span>
            <span className="text-sm font-medium text-content-secondary">
              LOGIN FORM
            </span>
          </div>
        </div>

        <div className="grid grid-row-1 gap-2 mt-2">
          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Email <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Registered PUP Email"
            />
            {errors.email && (
              <p className="text-state-danger text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Password <span className="text-brand-primary">*</span>
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 bg-brand-primary text-app-background font-semibold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
          {loading ? "Logging in..." : "Log in"}
        </button>
        <p className="text-center mt-4">
          Doesn't have an account?{" "}
          <Link className="text-brand-primary underline" href="/register">
            Register
          </Link>
        </p>
      </form>
    </Layout>
  );
}
