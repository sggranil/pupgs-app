"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { showToast, removeToasts } from "@/components/organisms/Toast";
import useUserRequest from "@/hooks/user";
import { updateUserSchema } from "@/types/api/auth.types";

import { useRouter } from "next/navigation";

type UpdateSchemaType = z.infer<typeof updateUserSchema>;

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUserRequest();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const router = useRouter();

  const {
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm<UpdateSchemaType>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    removeToasts();
    setLoading(true);

    try {
      const formData = getValues();
      const responseData = await updateUser(formData);

      if (!responseData) {
        throw new Error("No response received from the server.");
      }

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      showToast(
        responseData.message || "Password Updated Successfully",
        "success"
      );
      reset();
      router.push("/profile")
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast(
          "An unexpected error occurred. Please try again later.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (
    label: string,
    fieldName: keyof UpdateSchemaType,
    visible: boolean,
    toggle: () => void,
    errorMessage?: string
  ) => (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={visible ? "text" : "password"}
        className="w-full p-2 border rounded-md pr-10"
        {...register(fieldName)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-10 text-gray-600"
        tabIndex={-1}>
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-2xl font-medium mb-6 text-center">Change Password</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {renderPasswordField(
          "Current Password",
          "old_password",
          showCurrent,
          () => setShowCurrent(!showCurrent),
          errors.old_password?.message
        )}
        {renderPasswordField(
          "New Password",
          "password",
          showNew,
          () => setShowNew(!showNew),
          errors.password?.message
        )}
        {renderPasswordField(
          "Confirm New Password",
          "confirm_password",
          showConfirm,
          () => setShowConfirm(!showConfirm),
          errors.confirm_password?.message
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
