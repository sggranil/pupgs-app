import { FormEvent, useEffect, useState } from "react";
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

const AddThesisModal: React.FC<AddThesisProps> = ({ thesisData, setIsUpdated, setIsModalOpen }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteThesisData, setDeleteThesisData] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { addThesis, updateThesis, deleteThesis } = useThesisRequest();

    const {
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<AddThesisSchemaType>({
        resolver: zodResolver(addThesisSchema),
        defaultValues: {
            thesis_title: thesisData?.thesis_title || "",
            file_url: thesisData?.proposals[0].file_url || "",
        },
    });

    const [filePath, setFilePath] = useState<string>(thesisData?.proposals[0].file_url || "");

    useEffect(() => {
        if (thesisData?.proposals[0].file_url) {
            setFilePath(thesisData.proposals[0].file_url);
            setValue("file_url", thesisData.proposals[0].file_url);
        }
    }, [thesisData, setValue]);

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
            showToast("Please upload an attachment", "error");
            return;
        }

        setLoading(true);

        try {
            const values = getValues();
            let uploadedFileUrl = filePath;

            if (selectedFile) {
                const existingFilename = thesisData?.proposals[0].file_url?.split("/").pop();
                const uploadData = await uploadFile(selectedFile, existingFilename);

                if (!uploadData.fileUrl) {
                    throw new Error("Upload response missing file URL");
                }

                uploadedFileUrl = uploadData.fileUrl;
                setFilePath(uploadedFileUrl);
                setValue("file_url", uploadedFileUrl);
            }

            const textData = {
                id: thesisData?.id,
                thesis_title: values.thesis_title,
                file_url: uploadedFileUrl,
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
            setDeleteThesisData(true);
            const response = await deleteThesis(thesisData?.id);
            if (response) {
                showToast("Subject updated successfully!", "success");
                setIsUpdated(true);
                setIsModalOpen(false);
            } else {
                showToast("Unable to delete subject", "error");
                setIsUpdated(true);
                setIsModalOpen(false);
            }
        } catch (error) {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setDeleteThesisData(false);
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Thesis Title *
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        placeholder="Your proposed thesis title"
                        {...register("thesis_title")}
                        defaultValue={thesisData?.thesis_title}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Thesis/Concept Paper Attachment *
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
                        {loading ? "Submitting..." : thesisData ? "Update" : "Submit"}
                    </button>
                    {thesisData && (
                        <button
                            type="button"
                            disabled={deleteThesisData}
                            onClick={handleDeleteThesis}
                            className="w-full mt-6 py-2 border-2 border-bgPrimary text-bgPrimary bg-transparent font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                        >
                            {deleteThesisData ? "Deleting..." : "Delete"}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default AddThesisModal;
