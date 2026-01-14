"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema } from "@/types/api/auth.types";
import { showToast, removeToasts } from "@/components/template/Toaster";

import useAuthRequest from "@/hooks/auth";

type RegisterSchemaType = z.infer<typeof registerSchema>;

interface AddUserModalProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  setIsModalOpen,
  setUpdateCounter,
}) => {
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { registerUser } = useAuthRequest();

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      middle_name: "",
      ext_name: "",
      role: "adviser",
    },
  });

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    removeToasts();

    if (!isTermsChecked) {
      return;
    }

    setLoading(true);

    try {
      const formData = getValues();
      const payload = {
        ...formData,
        is_adviser_created: true,
      };
      const responseData = await registerUser(payload);

      if (responseData) {
        showToast("Adviser addedd successfully!", "success");
        setUpdateCounter((prev) => prev + 1);
        setIsModalOpen(false);
      } else {
        showToast(
          responseData?.message || "Registration failed. Please try again.",
          "error"
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      showToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            First Name *
          </label>
          <input
            type="text"
            {...register("first_name")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="First Name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Last Name *
          </label>
          <input
            type="text"
            {...register("last_name")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Last Name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Middle Name
          </label>
          <input
            type="text"
            {...register("middle_name")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Full Middle Name"
          />
          {errors.middle_name && (
            <p className="text-red-500 text-sm">{errors.middle_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Extension Name
          </label>
          <input
            type="text"
            {...register("ext_name")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Ex. Jr., Sr., III..."
          />
          {errors.ext_name && (
            <p className="text-red-500 text-sm">{errors.ext_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-row-1 gap-2 mt-2">
        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Email *
          </label>
          <input
            type="text"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Same with your PUP email used"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Password *
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-textPrimary font-semibold mb-1">
            Confirm Password *
          </label>
          <input
            type="password"
            {...register("confirm_password")}
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isTermsChecked}
          onChange={() => setIsTermsChecked(!isTermsChecked)}
          className="mr-2"
        />
        <label className="text-textPrimary">
          I agree to the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        disabled={!isTermsChecked || loading}
        className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default AddUserModal;
