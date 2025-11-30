"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { registerSchema } from "@/types/api/auth.types";
import { removeToasts, showToast } from "@/components/organisms/Toast";

import useAuthRequest from "@/hooks/auth";
import Layout from "./layout";

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegistrationPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { registerUser } = useAuthRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      middle_name: "",
      ext_name: "",
      role: "student",
      terms_accepted: false, 
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (formData) => {
    removeToasts();

    setLoading(true);

    try {
      const responseData = await registerUser(formData);

      if (responseData && responseData.access_token) {
        router.push(`/thesis`);
      } else {
        showToast(
          responseData?.message,
          "error"
        );
      }
    } catch (error) {
      showToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-6 bg-app-background rounded-2xl shadow-lg">
        <div className="h-20 flex items-center justify-start border-b border-gray-300 mb-4">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-2" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-content-primary">
              PUP Graduate Thesis Monitoring System
            </span>
            <span className="text-sm font-medium text-content-secondary">
              REGISTRATION FORM
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="block text-content-primary font-semibold mb-1">
              First Name <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              {...register("first_name")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Last Name <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              {...register("last_name")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* Middle Name */}
          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Middle Name
            </label>
            <input
              type="text"
              {...register("middle_name")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Full Middle Name"
            />
            {errors.middle_name && (
              <p className="text-red-500 text-sm">
                {errors.middle_name.message}
              </p>
            )}
          </div>

          {/* Extension Name */}
          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Extension Name
            </label>
            <input
              type="text"
              {...register("ext_name")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Ex. Jr., Sr., III..."
            />
            {errors.ext_name && (
              <p className="text-red-500 text-sm">
                {errors.ext_name.message}
              </p>
            )}
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
              placeholder="Same with your PUP email used"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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

          <div>
            <label className="block text-content-primary font-semibold mb-1">
              Confirm Password <span className="text-brand-primary">*</span>
            </label>
            <input
              type="password"
              {...register("confirm_password")}
              className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-app-background"
              placeholder="Re-enter your Password"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions Checkbox - Now registered with RHF */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            {...register("terms_accepted")} // <-- Register the field
            className="mr-2 cursor-pointer"
          />
          <label className="text-content-primary">
            I agree to the <a className="text-brand-primary underline" href="https://www.pup.edu.ph/terms/">Terms and Conditions</a>.
          </label>
        </div>
        
        {/* Display terms_accepted error if needed */}
        {errors.terms_accepted && (
          <p className="text-red-500 text-sm mt-1">
            {errors.terms_accepted.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 bg-brand-primary text-app-background font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a className="text-brand-primary underline" href="/login">
            Login
          </a>
        </p>
      </form>
    </Layout>
  );
}
