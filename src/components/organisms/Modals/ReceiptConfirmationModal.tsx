import React, { FormEvent, useState } from "react";
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
  // Renamed prop for clarity (it handles closure now)
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
  const { mutateAsync: updateReceipt } = useUpdateReceipt();

  async function onSubjectConfirmation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    removeToasts();

    setLoading(true);

    try {
      const values = getValues();

      const payload = {
        status: values.status,
        message: values.message,
      };

      updateReceipt(
        {
          id: receiptData?.id,
          payload: payload,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false); // Closes the modal
            setIsUpdated(true);
            showToast("You updated a receipt.", "success", "Receipt Updated");
          },
          onError: (error) => {
            setIsModalOpen(false); // Closes the modal even on error
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

  const {
    register,
    getValues,
    // setValue, // Unused, can be removed
    formState: { errors }, // Unused, can be removed
  } = useForm<ManageThesisReceiptSchemaType>({
    resolver: zodResolver(manageThesisReceiptSchema),
    defaultValues: {
      status: receiptData?.status,
      message: receiptData?.message,
    },
  });

  return (
    <form onSubmit={onSubjectConfirmation}>
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
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
          {loading ? "Uploading..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ReceiptConfirmationModal;
