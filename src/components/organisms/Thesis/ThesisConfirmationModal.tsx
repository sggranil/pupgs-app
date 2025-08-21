import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateThesisSchema, UpdateThesisSchemaType } from '@/types/api/thesis.types';
import { removeToasts, showToast } from '../Toast';

import useThesisRequest from '@/hooks/thesis';
import useAdviserRequest from '@/hooks/adviser';
import { Adviser } from '@/interface/user.interface';

interface ThesisConfirmationProps {
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
    thesisData?: any;
}

const ThesisConfirmationModal: React.FC<ThesisConfirmationProps> = ({
    thesisData,
    setIsModalOpen,
    setIsUpdated,
}) => {
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const [filteredAdvisers, setFilteredAdvisers] = useState<Adviser[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { confirmedThesis } = useThesisRequest();
    const { getAllAdviser } = useAdviserRequest();

    const {
        register,
        setValue,
        handleSubmit,
        watch,
    } = useForm<UpdateThesisSchemaType>({
        resolver: zodResolver(updateThesisSchema),
        defaultValues: {
            is_confirmed: thesisData?.is_confirmed ?? true,
            message: thesisData?.message,
            adviser_id: thesisData?.adviser_id ?? undefined,
        },
    });

    const isConfirmed = watch('is_confirmed');

    useEffect(() => {
        fetchAdvisers();
    }, []);

    const fetchAdvisers = async () => {
        try {
            const response = await getAllAdviser();
            const advisers = response?.data || [];
            setAdviserData(advisers);
            setFilteredAdvisers(advisers);
        } catch (error) {
            console.error('Error fetching advisers:', error);
            setAdviserData([]);
            setFilteredAdvisers([]);
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredAdvisers(adviserData);
        } else {
            const filtered = adviserData.filter((adviser) =>
                `${adviser.user.first_name} ${adviser.user.last_name}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
            setFilteredAdvisers(filtered);
        }
    }, [searchQuery, adviserData]);

    useEffect(() => {
        if (thesisData?.adviser_id) {
            const adviser = adviserData.find((a) => a.id === thesisData.adviser_id);
            if (adviser) {
                setSearchQuery(`${adviser.user.first_name} ${adviser.user.last_name}`);
                setValue('adviser_id', adviser.id);
            }
        }
    }, [thesisData, adviserData]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.adviser-dropdown')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onThesisConfirmation = async (data: UpdateThesisSchemaType) => {
        removeToasts();
        setLoading(true);

        try {
            if (data.is_confirmed && !data.adviser_id) {
                showToast('Please select a thesis adviser.', 'error');
                setLoading(false);
                return;
            }

            const textData = {
                id: thesisData?.id,
                is_confirmed: data.is_confirmed,
                adviser_id: data.adviser_id,
                message: data.message,
            };

            await confirmedThesis(textData);
            showToast('Thesis updated successfully!', 'success');
            setIsUpdated(true);
            setIsModalOpen(false);
        } catch (error: any) {
            showToast(`An error occurred. Please try again. ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onThesisConfirmation)}>
            <div className="w-full py-4">
                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">Confirmation</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        value={String(watch('is_confirmed'))}
                        onChange={(e) =>
                            setValue('is_confirmed', e.target.value === 'true', {
                                shouldValidate: true,
                            })
                        }
                    >
                        <option value="" disabled>
                            Confirmation
                        </option>
                        <option value="true">Approve</option>
                        <option value="false">Need Changes</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-textPrimary font-semibold mb-1">Message *</label><select
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        value={String(watch('message'))}
                        onChange={(e) =>
                            setValue('message', e.target.value, {
                                shouldValidate: true,
                            })
                        }
                    >
                        <option value="" disabled>
                            Choose a message
                        </option>

                        {/* ✅ Positive Confirmations */}
                        <optgroup label="✅ Positive Confirmations">
                            <option value="I confirm that I have received the thesis in full and it is complete.">
                            I confirm that I have received the thesis in full and it is complete.
                            </option>
                            <option value="The thesis has been received and reviewed without any issues.">
                            The thesis has been received and reviewed without any issues.
                            </option>
                            <option value="I acknowledge receipt of the thesis and confirm it is properly formatted.">
                            I acknowledge receipt of the thesis and confirm it is properly formatted.
                            </option>
                            <option value="Thesis document has been received and verified for completeness.">
                            Thesis document has been received and verified for completeness.
                            </option>
                            <option value="I confirm successful submission of the thesis with all required sections included.">
                            I confirm successful submission of the thesis with all required sections included.
                            </option>
                            <option value="I confirm that the thesis has been submitted on time and is accepted.">
                            I confirm that the thesis has been submitted on time and is accepted.
                            </option>
                        </optgroup>

                        {/* ⚠️ Neutral / Needs Attention */}
                        <optgroup label="⚠️ Neutral / Needs Attention">
                            <option value="Thesis has been received, but some sections are unclear.">
                            Thesis has been received, but some sections are unclear.
                            </option>
                            <option value="I acknowledge receipt of the thesis, but formatting needs adjustments.">
                            I acknowledge receipt of the thesis, but formatting needs adjustments.
                            </option>
                        </optgroup>

                        {/* ❌ Negative / Issues */}
                        <optgroup label="❌ Negative / Issues">
                            <option value="The thesis file appears to be incomplete or corrupted.">
                            The thesis file appears to be incomplete or corrupted.
                            </option>
                            <option value="I received the thesis, but the content does not match the submission guidelines.">
                            I received the thesis, but the content does not match the submission guidelines.
                            </option>
                        </optgroup>
                    </select>
                </div>

                {isConfirmed === true && (
                    <div className="mb-4 relative adviser-dropdown">
                        <label className="block text-textPrimary font-semibold mb-1">
                            Select Thesis Adviser *
                        </label>

                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Search adviser..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setDropdownOpen(true)}
                        />

                        {dropdownOpen && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
                                {filteredAdvisers.length > 0 ? (
                                    filteredAdvisers.map((adviser) => (
                                        <li
                                            key={adviser.id}
                                            onClick={() => {
                                                setValue('adviser_id', adviser.id, { shouldValidate: true });
                                                setSearchQuery(`${adviser.user.first_name} ${adviser.user.last_name}`);
                                                setDropdownOpen(false);
                                            }}
                                            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                                        >
                                            {adviser.user.first_name} {adviser.user.last_name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">No advisers found</li>
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-row gap-2">
                <button
                    type="submit"
                    className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Update'}
                </button>
            </div>
        </form>
    );
};

export default ThesisConfirmationModal;
