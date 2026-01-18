"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateReceipt } from "@/hooks/receipts";
import { showToast, removeToasts } from "@/components/template/Toaster";
import { CONFIRMATION_OPTIONS, RECEIPT_MESSAGES } from "@/constants/filters";
import { ThesisReceipt } from "@/interface/thesis.interface";
import {
  manageThesisReceiptSchema,
  ManageThesisReceiptSchemaType,
} from "@/types/api/thesis.types";

interface SubjectConfirmationProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  receiptData: ThesisReceipt;
}

const ReceiptConfirmationModal: React.FC<SubjectConfirmationProps> = ({
  receiptData,
  setIsModalOpen,
  setIsUpdated,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: updateReceipt, isPending: isUpdating } =
    useUpdateReceipt();

  const isLoading = loading || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ManageThesisReceiptSchemaType>({
    resolver: zodResolver(manageThesisReceiptSchema),
    defaultValues: {
      status: receiptData?.status,
      message: receiptData?.message,
    },
  });

  async function onSubjectConfirmation(values: ManageThesisReceiptSchemaType) {
    removeToasts();
    setLoading(true);

    try {
      await updateReceipt(
        {
          receipt_id: receiptData?.id,
          user_id: receiptData.student_id,
          payload: {
            status: values.status,
            message: values.message,
          },
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsUpdated(true);
            showToast("You updated a receipt.", "success", "Receipt Updated");
          },
          onError: (error) => {
            showToast(error.message, "error");
          },
        }
      );
    } catch (error: any) {
      showToast(
        `An error occurred. Please try again. ${error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubjectConfirmation)}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-textPrimary font-semibold mb-1">
            Confirmation
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("status")}>
            <option value="" disabled>
              Confirmation
            </option>
            {CONFIRMATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Message *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("message")}>
            <option value="" disabled>
              Choose a message
            </option>
            {Object.entries(RECEIPT_MESSAGES).map(([groupKey, group]) => (
              <optgroup key={groupKey} label={group.label}>
                {group.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:opacity-75 disabled:opacity-50 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <span className="material-symbols-rounded animate-spin">
                progress_activity
              </span>
              <span>Updating...</span>
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default ReceiptConfirmationModal;
