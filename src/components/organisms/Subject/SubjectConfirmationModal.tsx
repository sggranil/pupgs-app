import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";

import { enrolledSubjectSchema, EnrolledSubjectSchemaType } from '@/types/api/thesis.types';
import { removeToasts, showToast } from '../Toast';

import useSubjectRequest from "@/hooks/subject";

interface SubjectConfirmationProps {
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    subjectData?: any;
}

const SubjectConfirmationModal: React.FC<SubjectConfirmationProps> = ({ subjectData, setIsModalOpen, setIsUpdated }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { updateSubject } = useSubjectRequest();

    async function onSubjectConfirmation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        removeToasts();

        setLoading(true);

        try {
            const values = getValues();
            const textData = {
                id: subjectData?.id,
                is_confirmed: values.is_confirmed,
                message: values.message
            };

            await updateSubject(textData);
            showToast("Subject updated successfully!", "success");

            setIsUpdated(true);
            setIsModalOpen(false);
        } catch (error: any) {
            showToast(`An error occurred. Please try again. ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    }

    const {
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<EnrolledSubjectSchemaType>({
        resolver: zodResolver(enrolledSubjectSchema),
        defaultValues: {
            is_confirmed: subjectData?.is_confirmed,
            message: subjectData?.message,
        },
    });
    
    return (
        <form onSubmit={onSubjectConfirmation}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Confirmation
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        value={String(getValues("is_confirmed"))}
                        onChange={(e) => {
                            setValue("is_confirmed", e.target.value === "true", {
                                shouldValidate: true,
                            });
                        }}
                        >
                        <option value="" disabled>
                            Confirmation
                        </option>
                        <option value="true">Approve</option>
                        <option value="false">Need Changes</option>
                    </select>


                </div>
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Message *
                    </label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        placeholder="Message"
                        {...register("message")}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <button
                    type="submit"
                    className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default SubjectConfirmationModal;
