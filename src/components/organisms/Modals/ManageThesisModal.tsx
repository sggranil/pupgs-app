import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addThesisSchema, AddThesisSchemaType } from "@/types/api/thesis.types";
import { showToast, removeToasts } from "@/components/template/Toaster";
import { Thesis } from "@/interface/thesis.interface";
import { useAddThesis, useDeleteThesis, useUpdateThesis } from "@/hooks/thesis";

interface ManageThesisProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  thesisData?: Thesis;
  userId: number;
}

const ManageThesisModal: React.FC<ManageThesisProps> = ({
  thesisData,
  setIsUpdated,
  setIsModalOpen,
  userId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { mutateAsync: addThesis } = useAddThesis();
  const { mutateAsync: deleteThesis } = useDeleteThesis();

  const isEditing = !!thesisData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddThesisSchemaType>({
    resolver: zodResolver(addThesisSchema),
    defaultValues: {
      thesis_title: thesisData?.thesis_title || "",
      file_url: thesisData?.attachments?.[0]?.file_url || "",
    },
  });

  async function handleFormSubmit(values: AddThesisSchemaType) {
    removeToasts();
    setLoading(true);

    try {
      const payload = {
        user_id: userId,
        thesis_title: values.thesis_title,
        file_type: "proposal",
        file_url: values.file_url,
      };

      addThesis(
        { ...payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsUpdated(true);
            showToast(
              "You added a new proposal",
              "success",
              "Proposal Uploaded"
            );
          },
          onError: (error) => {
            setIsModalOpen(false);
            showToast(error.message, "error");
          },
        }
      );
    } catch (error) {
      const errorMessage =
        (error as any)?.message ||
        "An error occurred during submission. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteThesis() {
    if (!thesisData?.id) {
      showToast("Error: Missing thesis ID for deletion.", "error");
      return;
    }

    setDeleteLoading(true);
    try {
      const response = await deleteThesis(Number(thesisData.id));

      if (response && response.message) {
        showToast(response.message, "success");
      } else {
        showToast("Concept paper deleted successfully!", "success");
      }

      setIsUpdated(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Deletion error:", error);
      const errorMessage =
        (error as any)?.message ||
        "An error occurred during deletion. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label
            htmlFor="thesis_title"
            className="block text-content-primary font-semibold mb-1">
            Concept Paper Title <span className="text-brand-primary">*</span>
          </label>
          <input
            id="thesis_title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Your proposed thesis title"
            {...register("thesis_title")}
          />
          {errors.thesis_title && (
            <p className="text-state-danger text-sm mt-1">
              {errors.thesis_title.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="file_url"
            className="block text-content-primary font-semibold mb-1">
            Concept Paper Attachment{" "}
            <span className="text-brand-primary">*</span>
          </label>
          <input
            id="file_url"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Paste your public Google Docs or Drive link"
            {...register("file_url")}
          />
          <p className="mt-2 text-textPrimary text-sm">
            The link must be a public{" "}
            <span className="text-brand-primary font-medium">
              Google Docs or Google Drive
            </span>{" "}
            link.
          </p>
          {errors.file_url && (
            <p className="text-state-danger text-sm mt-1">
              {errors.file_url.message}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            disabled={loading || deleteLoading}
            className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
            {loading
              ? isEditing
                ? "Updating..."
                : "Submitting..."
              : isEditing
              ? "Update"
              : "Submit"}
          </button>

          {isEditing && (
            <button
              type="button"
              disabled={loading || deleteLoading}
              onClick={handleDeleteThesis}
              className="w-full mt-6 py-2 border-2 border-brand-primary text-brand-primary bg-transparent font-bold rounded-lg hover:bg-brand-primary-hover hover:border-brand-primary-hover hover:text-brand-primary-hover disabled:opacity-50 transition-colors duration-150">
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ManageThesisModal;
