import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addThesisSchema, AddThesisSchemaType } from "@/types/api/thesis.types";
import useThesisRequest from "@/hooks/thesis";
import { showToast, removeToasts } from "@/components/templates/Toaster";

interface ThesisDataType {
  id: string | number;
  thesis_title: string;
  file_type: string;
  status: string;
  proposals?: { file_url: string }[];
}

interface AddThesisProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  thesisData?: ThesisDataType;
}

const AddThesisModal: React.FC<AddThesisProps> = ({
  thesisData,
  setIsUpdated,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteThesisData, setDeleteThesisData] = useState<boolean>(false);
  const { addThesis, updateThesis, deleteThesis } = useThesisRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddThesisSchemaType>({
    resolver: zodResolver(addThesisSchema),
    defaultValues: {
      thesis_title: thesisData?.thesis_title || "",
      file_type: thesisData?.file_type || "",
      status: thesisData?.status || "",
      file_url: thesisData?.proposals?.[0]?.file_url || "",
    },
  });

  async function handleFormSubmit(values: AddThesisSchemaType) {
    removeToasts();
    setLoading(true);

    try {
      const basePayload = {
        thesis_title: values.thesis_title,
        file_type: "proposal",
        file_url: values.file_url,
        status: "pending_review",
      };

      if (thesisData) {
        const updatePayload = {
          ...basePayload,
          id: thesisData.id,
        };
        const response = await updateThesis(updatePayload);
        try {
          showToast(response.message, "success");
        } catch (e) {
          showToast(response.message, "error");
        }
      } else {
        const response = await addThesis(basePayload);
        try {
          showToast(response.message, "success");
        } catch (e) {
          showToast(response.message, "error");
        }
      }

      setIsUpdated(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteThesis() {
    if (!thesisData?.id) {
      showToast("Error: Missing thesis ID for deletion.", "error");
      return;
    }

    setDeleteThesisData(true);
    try {
      const response = await deleteThesis(Number(thesisData.id));

      if (response) {
        showToast("Subject deleted successfully!", "success");
        setIsUpdated(true);
        setIsModalOpen(false);
      } else {
        showToast("Unable to delete subject", "error");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setDeleteThesisData(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label className="block text-content-primary font-semibold mb-1">
            Concept Paper Title <span className="text-brand-primary">*</span>
          </label>
          <input
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
          <label className="block text-content-primary font-semibold mb-1">
            Concept Paper Attachment <span className="text-brand-primary">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Paste your public Google Docs or Drive link"
            {...register("file_url")}
          />
          <p className="mt-2 text-textPrimary">
            The link must be a public <span className="text-brand-primary">Google Docs or Google Drive</span> link.
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
            disabled={loading || deleteThesisData}
            className="w-full mt-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
            {loading ? "Submitting..." : thesisData ? "Update" : "Submit"}
          </button>
          {thesisData && (
            <button
              type="button"
              disabled={loading || deleteThesisData}
              onClick={handleDeleteThesis}
              className="w-full mt-6 py-2 border-2 border-brand-primary text-bgPrimary bg-transparent font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
              {deleteThesisData ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddThesisModal;