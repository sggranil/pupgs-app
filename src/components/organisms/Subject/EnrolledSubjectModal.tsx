import { FormEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import { enrolledSubjectSchema, EnrolledSubjectSchemaType } from "@/types/api/thesis.types";
import useSubjectRequest from "@/hooks/subject";

interface EnrolledSubjectProps {
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    subjectData?: any;
    receiptApproveCount?: number;
}

const EnrolledSubjectModal: React.FC<EnrolledSubjectProps> = ({ subjectData, setIsUpdated, setIsModalOpen, receiptApproveCount }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteSubjectData, setDeleteSubjectData] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { addSubject, updateSubject, deleteSubject } = useSubjectRequest();

    const count = receiptApproveCount ?? 0;

    const {
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<EnrolledSubjectSchemaType>({
        resolver: zodResolver(enrolledSubjectSchema),
        defaultValues: {
            subject_name: subjectData?.subject_name || "",
            or_number: subjectData?.or_number || "",
            attachment: subjectData?.attachment || "",
        },
    });

    const [filePath, setFilePath] = useState<string>(subjectData?.attachment || "");

    useEffect(() => {
        if (subjectData?.attachment) {
            setFilePath(subjectData.attachment);
            setValue("attachment", subjectData.attachment);
        }
    }, [subjectData, setValue]);

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
                const existingFilename = subjectData?.attachment?.split("/").pop();
                const uploadData = await uploadFile(selectedFile, existingFilename);

                if (!uploadData.fileUrl) {
                    throw new Error("Upload response missing file URL");
                }

                uploadedFileUrl = uploadData.fileUrl;
                setFilePath(uploadedFileUrl);
                setValue("attachment", uploadedFileUrl);
            }

            const textData = {
                id: subjectData?.id,
                subject_name: values.subject_name,
                or_number: values.or_number,
                attachment: uploadedFileUrl,
            };

            if (subjectData) {
                await updateSubject(textData);
                showToast("Subject updated successfully!", "success");
            } else {
                await addSubject(textData);
                showToast("Subject added successfully!", "success");
            }

            setIsUpdated(true);
            setIsModalOpen(false);
        } catch (error: any) {
            showToast(`An error occurred. Please try again.`, "error");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteSubject() {
        setDeleteSubjectData(true);
        try {
            setDeleteSubjectData(true);
            const response = await deleteSubject(subjectData?.id);
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
            setDeleteSubjectData(false);
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Thesis/Dissertation Phases *
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        {...register("subject_name")}
                    >
                        <option value="" disabled>
                            Select Defense Phase
                        </option>
                        <option disabled={count > 1} value="Thesis Proposal">Thesis Proposal</option>
                        <option disabled={count > 2} value="Pre-Oral Defense">Pre-Oral Defense</option>
                        <option disabled={count > 3} value="Final Defense">Final Defense</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Official Receipt No. *
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        placeholder="OR Number"
                        {...register("or_number")}
                        defaultValue={subjectData?.or_number}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        OR Attachment * (Image file)
                    </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleFileChange}
                    />

                    {filePath && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Uploaded File:</p>
                            {filePath.startsWith("data:image/") || filePath.includes("/uploads/") ? (
                                <img
                                    src={filePath}
                                    alt="File preview"
                                    className="mt-2 w-32 h-32 object-cover border rounded"
                                />
                            ) : (
                                <a
                                    href={filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View File
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <input type="hidden" {...register("attachment")} value={filePath} />

                <div className="flex flex-row gap-2">
                    <button
                        type="submit"
                        disabled={!filePath || loading}
                        className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : subjectData ? "Update" : "Upload"}
                    </button>
                    {subjectData && (
                        <button
                            type="button"
                            disabled={deleteSubjectData}
                            onClick={handleDeleteSubject}
                            className="w-full mt-6 py-2 border-2 border-bgPrimary text-bgPrimary bg-transparent font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                        >
                            {deleteSubjectData ? "Deleting..." : "Delete"}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default EnrolledSubjectModal;
