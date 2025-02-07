import { FormEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import useProposalRequest from "@/hooks/proposal";

interface RevisedProposalProps {
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    thesisId: string;
}

const AddRevisedProposalModal: React.FC<RevisedProposalProps> = ({ thesisId, setIsUpdated, setIsModalOpen }) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const { addProposal } = useProposalRequest();

    const {
        register,
        setValue,
    } = useForm();

    const [ filePath, setFilePath ] = useState<string>("");

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

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const url = "/api/file/upload";

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
            let uploadedFileUrl = filePath;

            if (selectedFile) {
                const uploadData = await uploadFile(selectedFile);

                if (!uploadData.fileUrl) {
                    throw new Error("Upload response missing file URL");
                }

                uploadedFileUrl = uploadData.fileUrl;
                setFilePath(uploadedFileUrl);
                setValue("file_url", uploadedFileUrl);
            }

            const response = await addProposal({
                thesis_id: thesisId,
                file_url: uploadedFileUrl,
            });

            if (response) {
                showToast("File updated successfully!", "success");
                setIsUpdated(true);
                setIsModalOpen(false);
            } else {
                showToast(response.message || "Unable to upload", "error");
            }
        } catch (error) {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Proposal Attachment *
                    </label>
                    <input
                        type="file"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleFileChange}
                    />

                    {filePath && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Uploaded File:</p>
                            {filePath.endsWith(".pdf") ? (
                                <iframe
                                    src={filePath}
                                    className="mt-2 w-full h-64 border rounded"
                                    title="PDF Preview"
                                />
                            ) : filePath.startsWith("data:image/") || filePath.includes("/uploads/") ? (
                                <img src={filePath} alt="File preview" className="mt-2 w-32 h-32 object-cover border rounded" />
                            ) : (
                                <a href={filePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View File
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <input type="hidden" {...register("file_url")} value={filePath} />

                <div className="flex flex-row gap-2">
                    <button
                        type="submit"
                        disabled={!filePath || loading}
                        className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddRevisedProposalModal;
