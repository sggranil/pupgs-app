"use client";

import { Adviser } from "@/interface/user.interface";
import { useEffect, useState } from "react";
import { Thesis } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";
import { showToast } from "../Toast";

interface Props {
    thesisData: Thesis | null;
    adviserData: Adviser[];
    setIsModalOpen: (modalOpen: boolean) => void;
    setIsUpdated: (isUpdated: boolean) => void;
}

const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
};

const formatTime = (timeString: string | null | undefined): string => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toTimeString().slice(0, 5);
};

const ScheduleThesisModal: React.FC<Props> = ({ thesisData, adviserData, setIsModalOpen, setIsUpdated }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<string>(formatDate(thesisData?.defense_date));
    const [time, setTime] = useState<string>(formatTime(thesisData?.defense_time));
    const [selectedAdvisers, setSelectedAdvisers] = useState<number[]>(
        thesisData?.panelists?.map(panelist => panelist.id) || []
    );

    const { scheduleThesis } = useThesisRequest();

    useEffect(() => {
        setDate(formatDate(thesisData?.defense_date));
        setTime(formatTime(thesisData?.defense_time));
        setSelectedAdvisers(thesisData?.panelists?.map(panelist => panelist.id) || []);
    }, [thesisData]);

    const handleAdviserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        setSelectedAdvisers(selectedValues);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    const handleSubmit = async () => {
        if (!date || !time || selectedAdvisers.length === 0) return;

        const data = {
            id: thesisData?.id,
            defense_date: date,
            defense_time: time,
            panelists: selectedAdvisers,
        }

        setLoading(true);

        try {
            const response = await scheduleThesis(data)

            if (response) {
                showToast("Thesis scheduled updated successfully.", "success")
            } else {
                showToast(response.message || "Thesis scheduled updated failed.", "error")
            }

            setIsUpdated(true);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating thesis:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <label className="font-medium">
                Select Date:
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="block w-full p-2 mt-1 border rounded-lg"
                />
            </label>

            <label className="font-medium">
                Select Time:
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="block w-full p-2 mt-1 border rounded-lg"
                />
            </label>

            <div className="mb-4">
                <label className="block text-textPrimary font-semibold mb-1">
                    Select Thesis Advisers *
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                    multiple
                    value={selectedAdvisers.map(String)}
                    onChange={handleAdviserSelection}
                >
                    {adviserData.length > 0 ? (
                        adviserData.map((adviser) => (
                            <option key={adviser.id} value={adviser.id}>
                                {adviser.user?.first_name} {adviser.user?.last_name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No advisers found</option>
                    )}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                    Hold `Ctrl` (Windows) or `Cmd` (Mac) to select multiple advisers.
                </p>
            </div>

            <div className="flex flex-row gap-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!date || !time || selectedAdvisers.length === 0 || loading}
                    className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    );
};

export default ScheduleThesisModal;
