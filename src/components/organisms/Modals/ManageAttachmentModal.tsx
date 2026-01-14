import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AddAttachmentSchemaType,
  addAttachmentSchema,
} from "@/types/api/thesis.types";
import { FILE_TYPES } from "@/constants/filters";

import { showToast, removeToasts } from "@/components/template/Toaster";
import { useAddAttachment } from "@/hooks/attachment";

interface ManageAttachmentProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  thesisId: number;
}

const ManageAttachmentModal: React.FC<ManageAttachmentProps> = ({
  thesisId,
  setIsUpdated,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutateAsync: addAttachment } = useAddAttachment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAttachmentSchemaType>({
    resolver: zodResolver(addAttachmentSchema),
  });

  async function handleFormSubmit(values: AddAttachmentSchemaType) {
    removeToasts();
    setLoading(true);

    try {
      const payload = {
        thesis_id: thesisId,
        title: values.title,
        file_type: values.file_type,
        file_url: values.file_url,
      };

      addAttachment(
        { payload: payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsUpdated(true);
            showToast(
              `You added a new ${values.file_type} attachment.`,
              "success",
              "Attachment Uploaded"
            );
          },
          onError: (error) => {
            setIsModalOpen(false);
            showToast(error.message, "error");
          },
        }
      );
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full py-2">
        <div className="mb-4">
          <label className="text-sm block text-context-primary font-semibold mb-1">
            Title <span className="text-brand-primary">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 text-sm border border-gray-300 rounded-md text-context-primary bg-white"
            placeholder="Add your Attachment Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="file_type"
            className="text-sm block text-context-primary font-semibold mb-1">
            Program <span className="text-brand-primary">*</span>
          </label>
          <select
            id="file_type"
            className="w-full p-2 border text-sm border-gray-300 rounded-md text-textPrimary bg-white focus:ring-blue-500 focus:border-blue-500"
            {...register("file_type")}>
            <option value="" disabled>
              Select a File Type
            </option>
            {FILE_TYPES.map((types, index) => (
              <option key={index} value={types.value}>
                {types.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm block text-context-primary font-semibold mb-1">
            Link Attachment <span className="text-brand-primary">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 text-sm border border-gray-300 rounded-md text-context-primary bg-white"
            placeholder="Paste your Google Drive or Docs link here"
            {...register("file_url")}
          />
          <p className="mt-2 text-content-primary text-sm">
            The link must be a public{" "}
            <span className="text-brand-primary">Google Drive or Docs</span>{" "}
            link.
          </p>
          {errors.file_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.file_url.message}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary-hover disabled:opacity-75">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ManageAttachmentModal;
