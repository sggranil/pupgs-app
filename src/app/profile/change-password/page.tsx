"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpdateUser } from "@/hooks/user";
import {
  UpdatePasswordSchemaType,
  updatePasswordSchema, // Use the specific password schema
} from "@/types/api/auth.types";
import { showToast, removeToasts } from "@/components/template/Toaster";
import { useUserContext } from "@/providers/UserProvider";

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
      <label className="text-sm text-context-primary font-semibold mb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          className={`w-full p-2 border rounded-md text-context-primary bg-white text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
            error ? "border-red-500" : "border-gray-300"
          }`}
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
      {error && (
        <p className="text-red-500 text-[10px] mt-1 font-medium italic">
          {error}
        </p>
      )}
    </div>
  );
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema), // Fixed: Use the password-specific schema
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const isLoading = loading || isUpdating;

  async function onFormSubmit(values: UpdatePasswordSchemaType) {
    removeToasts();
    setLoading(true);

    try {
      await updateUser(
        {
          user_id: user?.id,
          payload: values,
        },
        {
          onSuccess: () => {
            showToast(
              "Your password has been changed.",
              "success",
              "Update Successful"
            );
            reset();
            router.back();
          },
          onError: (error: any) => {
            showToast(error?.message || "Failed to update password.", "error");
          },
        }
      );
    } catch (error: any) {
      showToast("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-context-primary">
          Security Settings
        </h2>
        <p className="text-xs text-gray-500">Update your account password</p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Schema path: "old_password" for "All fields required" message */}
        <PasswordField
          label="Current Password *"
          registration={register("old_password")}
          error={errors.old_password?.message}
        />

        <PasswordField
          label="New Password *"
          registration={register("password")}
          error={errors.password?.message}
        />

        {/* Schema path: "confirm_password" for "Passwords do not match" message */}
        <PasswordField
          label="Confirm New Password *"
          registration={register("confirm_password")}
          error={errors.confirm_password?.message}
        />

        <div className="flex flex-col gap-3 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-brand-primary text-white font-bold rounded-md hover:bg-brand-primary-hover disabled:opacity-75 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]">
            {isLoading ? (
              <>
                <span className="material-symbols-rounded animate-spin">
                  progress_activity
                </span>
                <span>Updating...</span>
              </>
            ) : (
              "Change Password"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="w-full py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
