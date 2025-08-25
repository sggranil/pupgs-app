import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import useProposalRequest from "@/hooks/proposal";

import { AddProposalSchemaType, addProposalSchema } from "@/types/api/thesis.types";

interface RevisedProposalProps {
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    thesisId: string;
}

const AddRevisedProposalModal: React.FC<RevisedProposalProps> = ({ thesisId, setIsUpdated, setIsModalOpen }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { addProposal } = useProposalRequest();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddProposalSchemaType>({
        resolver: zodResolver(addProposalSchema),
        defaultValues: {
            file_url: "",
        },
    });

    async function handleFormSubmit(values: AddProposalSchemaType) {
        removeToasts();
        setLoading(true);

        try {
            const response = await addProposal({
                thesis_id: thesisId,
                file_url: values.file_url,
            });

            if (response) {
                showToast("Proposal link updated successfully!", "success");
                setIsUpdated(true);
                setIsModalOpen(false);
            } else {
                showToast("Unable to upload", "error");
            }
        } catch (error) {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Proposal Attachment *
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        placeholder="Paste your Google Drive or Docs link here"
                        {...register("file_url")}
                    />
                    <p className="mt-2 text-textPrimary">The link must be a public Google Drive or Docs link.</p>
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
                        className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddRevisedProposalModal;