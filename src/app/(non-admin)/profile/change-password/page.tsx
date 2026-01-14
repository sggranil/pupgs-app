"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpdateUser } from "@/hooks/user";
import {
  UpdatePasswordSchemaType,
  updateUserSchema,
} from "@/types/api/auth.types";
import { showToast, removeToasts } from "@/components/template/Toaster";

const PasswordField = ({
  label,
  error,
  registration,
}: {
  label: string;
  error?: string;
  registration: any;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          className="w-full p-2 border rounded-md pr-10"
          {...registration}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex={-1}>
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const { mutateAsync: updateUpdateUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updateUserSchema),
  });

  const isLoading = isSubmitting;

  async function onFormSubmit(values: UpdatePasswordSchemaType) {
    removeToasts();

    try {
      const response = await updateUpdateUser(values);

      showToast("Password Updated Successfully", "success");
      reset();
      router.push("/profile");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      showToast(errorMessage, "error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <PasswordField
          label="Current Password"
          registration={register("old_password")}
          error={errors.old_password?.message}
        />

        <PasswordField
          label="New Password"
          registration={register("password")}
          error={errors.password?.message}
        />

        <PasswordField
          label="Confirm New Password"
          registration={register("confirm_password")}
          error={errors.confirm_password?.message}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-2 bg-bgPrimary text-white font-bold rounded-lg hover:brightness-90 disabled:opacity-50 transition-all">
          {isLoading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
