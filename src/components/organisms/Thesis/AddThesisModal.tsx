import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import { addThesisSchema, AddThesisSchemaType } from "@/types/api/thesis.types";
import useThesisRequest from "@/hooks/thesis";

interface AddThesisProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  thesisData?: any;
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
      file_url: thesisData?.proposals?.[0]?.file_url || "",
      status: thesisData?.status || "",
    },
  });

  async function handleFormSubmit(values: AddThesisSchemaType) {
    removeToasts();
    setLoading(true);
    try {
      const textData = {
        id: thesisData?.id,
        thesis_title: values.thesis_title,
        file_type: "proposal",
        file_url: values.file_url,
        status: "pending_review",
      };

      if (thesisData) {
        await updateThesis(textData);
        showToast("Subject updated successfully!", "success");
      } else {
        await addThesis(textData);
        showToast("Subject added successfully!", "success");
      }
      setIsUpdated(true);
      setIsModalOpen(false);
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteThesis() {
    setDeleteThesisData(true);
    try {
      const response = await deleteThesis(thesisData?.id);
      if (response) {
        showToast("Subject deleted successfully!", "success");
        setIsUpdated(true);
        setIsModalOpen(false);
      } else {
        showToast("Unable to delete subject", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setDeleteThesisData(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Concept Paper Title *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Your proposed thesis title"
            {...register("thesis_title")}
          />
          {errors.thesis_title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thesis_title.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Concept Paper Attachment *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            placeholder="Your proposed thesis title"
            {...register("file_url")}
          />
          <p className="mt-2 text-textPrimary">
            The link must be a public Google Docs or Drive link.
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
            disabled={loading || deleteThesisData}
            className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
            {loading ? "Submitting..." : thesisData ? "Update" : "Submit"}
          </button>
          {thesisData && (
            <button
              type="button"
              disabled={loading || deleteThesisData}
              onClick={handleDeleteThesis}
              className="w-full mt-6 py-2 border-2 border-bgPrimary text-bgPrimary bg-transparent font-bold rounded-lg hover:opacity-75 disabled:opacity-50">
              {deleteThesisData ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddThesisModal;
