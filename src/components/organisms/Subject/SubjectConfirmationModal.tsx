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
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        value={String(getValues("message"))}
                        onChange={(e) => {
                            setValue("message", e.target.value, {
                                shouldValidate: true,
                            });
                        }}
                        >
                        <option value="" disabled>
                            Choose a message
                        </option>

                        {/* ✅ Positive Confirmations */}
                        <optgroup label="✅ Positive Confirmations">
                            <option value="I confirm that I have received the receipt and all details are correct.">
                            I confirm that I have received the receipt and all details are correct.
                            </option>
                            <option value="I acknowledge receipt of the document with no issues found.">
                            I acknowledge receipt of the document with no issues found.
                            </option>
                            <option value="Receipt has been received and verified successfully.">
                            Receipt has been received and verified successfully.
                            </option>
                            <option value="I confirm that the receipt is complete and accurate.">
                            I confirm that the receipt is complete and accurate.
                            </option>
                            <option value="I have received and checked the receipt, and it matches the transaction.">
                            I have received and checked the receipt, and it matches the transaction.
                            </option>
                            <option value="Receipt received, reviewed, and confirmed without discrepancies.">
                            Receipt received, reviewed, and confirmed without discrepancies.
                            </option>
                        </optgroup>

                        {/* ⚠️ Neutral / Needs Attention */}
                        <optgroup label="⚠️ Neutral / Needs Attention">
                            <option value="I have received the receipt, but some details are unclear.">
                            I have received the receipt, but some details are unclear.
                            </option>
                            <option value="Receipt was received, but I need clarification on specific items.">
                            Receipt was received, but I need clarification on specific items.
                            </option>
                        </optgroup>

                        {/* ❌ Negative / Issues */}
                        <optgroup label="❌ Negative / Issues">
                            <option value="I have not received the receipt yet, please resend.">
                            I have not received the receipt yet, please resend.
                            </option>
                            <option value="I received the receipt, but the details are incorrect.">
                            I received the receipt, but the details are incorrect.
                            </option>
                        </optgroup>
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
