"use client";

import { FormEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ThesisReceipt } from "@/interface/thesis.interface";

import { showToast, removeToasts } from "@/components/template/Toaster";
import {
  manageThesisReceiptSchema,
  ManageThesisReceiptSchemaType,
} from "@/types/api/thesis.types";
import {
  useAddReceipt,
  useDeleteReceipt,
  useUpdateReceipt,
} from "@/hooks/receipts";
import { formatSnakeCase } from "@/utilities/StringFormatter";

interface ManageThesisReceiptProps {
  userId: number;
  thesisId?: number;
  receiptData?: ThesisReceipt | null;
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
}

const ManageThesisReceiptModal: React.FC<ManageThesisReceiptProps> = ({
  userId,
  thesisId,
  receiptData,
  setIsUpdated,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteSubjectData, setDeleteSubjectData] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync: addReceipt } = useAddReceipt();
  const { mutateAsync: updateReceipt } = useUpdateReceipt();
  const { mutateAsync: deleteReceipt } = useDeleteReceipt();

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ManageThesisReceiptSchemaType>({
    resolver: zodResolver(manageThesisReceiptSchema),
    defaultValues: {
      receipt_name: receiptData?.receipt_name || "",
      or_number: receiptData?.or_number || "",
    },
  });

  const [filePath, setFilePath] = useState<string>(
    receiptData?.attachment || ""
  );

  useEffect(() => {
    if (receiptData?.attachment) {
      setFilePath(receiptData.attachment);
      setValue("attachment", receiptData.attachment, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [receiptData, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setFilePath(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePath(URL.createObjectURL(file));
      }
    }
  };

  const uploadFile = async (file: File, existingFilename?: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const url = existingFilename
      ? `/api/file/upload?filename=${encodeURIComponent(existingFilename)}`
      : "/api/file/upload";

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  };

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    removeToasts();

    if (!selectedFile && !filePath) {
      showToast("Please upload an OR attachment", "error");
      return;
    }

    setLoading(true);

    try {
      const values = getValues();
      let uploadedFileUrl = filePath;

      if (selectedFile) {
        const existingFilename = receiptData?.attachment?.split("/").pop();
        const uploadData = await uploadFile(selectedFile, existingFilename);

        if (!uploadData.fileUrl) {
          throw new Error("Upload response missing file URL");
        }

        uploadedFileUrl = uploadData.fileUrl;
        setFilePath(uploadedFileUrl);
        setValue("attachment", uploadedFileUrl);
      }

      const payload = {
        receipt_name: formatSnakeCase(values.receipt_name),
        thesis_id: Number(thesisId),
        or_number: values.or_number,
        attachment: uploadedFileUrl,
      };

      if (receiptData) {
        updateReceipt(
          {
            receipt_id: Number(receiptData.id), // <-- Corrected key in original code, but issue remains
            user_id: Number(userId),
            payload: payload,
          },
          {
            onSuccess: () => {
              showToast(
                "You updated the receipt.",
                "success",
                "Receipt Updated"
              );
              setIsModalOpen(false);
              setIsUpdated(true);
            },
            onError: (error) => {
              setIsModalOpen(false);
              showToast(error.message, "error");
            },
          }
        );
      } else {
        addReceipt(
          { user_id: Number(userId), payload: payload },
          {
            onSuccess: () => {
              showToast("You added a receipt.", "success", "Receipt Uploaded");
              setIsModalOpen(false);
              setIsUpdated(true);
            },
            onError: (error) => {
              setIsModalOpen(false);
              showToast(error.message, "error");
            },
          }
        );
      }
    } catch (error: any) {
      showToast(`An error occurred. Please try again.`, "error");
    } finally {
      setLoading(false);
    }
  }

  async function onHandleDelete(id: number) {
    setLoading(true);
    try {
      deleteReceipt(id, {
        onSuccess: () => {
          showToast("You delete a receipt.", "success", "Receipt Deleted");
          setIsModalOpen(false);
          setIsUpdated(true);
        },
        onError: (error) => {
          setIsModalOpen(false);
          showToast(error.message, "error");
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label className="block text-content-primary text-sm font-semibold mb-1">
            Thesis/Dissertation Phases{" "}
            <span className="text-brand-primary">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-content-primary bg-white text-sm"
            {...register("receipt_name")}>
            <option value="" disabled>
              Select Defense Phase
            </option>
            <option value="thesis_proposal">Thesis Proposal</option>
            <option value="pre_oral_defense">Pre-Oral Defense</option>
            <option value="final_defense">Final Defense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-content-primary text-sm font-semibold mb-1">
            Official Receipt No. <span className="text-brand-primary">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-content-primary text-sm bg-white"
            placeholder="OR Number"
            {...register("or_number")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-content-primary text-sm font-semibold mb-1">
            OR Attachment * (Image file)
          </label>

          {filePath && !selectedFile ? (
            <div className="border p-3 rounded-md bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Current Attachment:
              </p>

              {filePath.startsWith("data:image/") ||
              filePath.includes("/uploads/") ? (
                <img
                  src={filePath}
                  alt="File preview"
                  className="mt-2 w-1/2 max-h-48 object-cover border rounded"
                />
              ) : (
                <a
                  href={filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm truncate">
                  {filePath.split("/").pop()}
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setFilePath("");
                  setSelectedFile(null);
                  setValue("attachment", "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="mt-3 text-sm text-red-600 hover:text-red-800 underline">
                Change Attachment
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="w-full p-2 border border-gray-300 cursor-pointer text-sm rounded-md text-content-primary bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleFileChange}
            />
          )}

          {selectedFile && (
            <div className="mt-2 text-sm text-green-600 font-semibold">
              New file selected: {selectedFile.name}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            disabled={!filePath || loading}
            className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
            {loading ? "Uploading..." : receiptData ? "Update" : "Upload"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onHandleDelete(receiptData?.id ?? 0)}
            className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ManageThesisReceiptModal;
