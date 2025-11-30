import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";

import { enrolledSubjectSchema, EnrolledSubjectSchemaType } from '@/types/api/thesis.types';

import useSubjectRequest from "@/hooks/subject";
import { showToast, removeToasts } from "@/components/templates/Toaster";

import { CONFIRMATION_OPTIONS, RECEIPT_MESSAGES } from '@/constants/filters';

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
                status: values.status,
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
            status: subjectData?.status,
            message: subjectData?.message,
        },
    });

    return (
        <form onSubmit={onSubjectConfirmation}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label htmlFor="status" className="block text-textPrimary font-semibold mb-1">
                        Confirmation
                    </label>
                    <select
                        id="status"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        {...register("status")}
                    >
                        <option value="" disabled>
                            Confirmation
                        </option>
                        {CONFIRMATION_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>


                </div>
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">
                        Message *
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        {...register('message')}
                    >
                        <option value="" disabled>
                            Choose a message
                        </option>
                        {Object.entries(RECEIPT_MESSAGES).map(([groupKey, group]) => (
                            <optgroup key={groupKey} label={group.label}>
                                {group.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
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
