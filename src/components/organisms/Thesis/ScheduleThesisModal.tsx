"use client";

import { Adviser } from "@/interface/user.interface";
import { Thesis, Room } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";
import useRoomRequest from "@/hooks/room";
import { useEffect, useState } from "react";
import { showToast } from "../Toast";

const TIME_OPTIONS = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const format12Hour = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour + 11) % 12 + 1);
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

interface Props {
    thesisData: Thesis | null;
    adviserData: Adviser[];
    roomData: Room[];
    setIsModalOpen: (open: boolean) => void;
    setIsUpdated: (updated: boolean) => void;
}

const ScheduleThesisModal: React.FC<Props> = ({
    thesisData,
    adviserData,
    roomData,
    setIsModalOpen,
    setIsUpdated,
}) => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState(0);
    const [selectedAdvisers, setSelectedAdvisers] = useState<number[]>([]);
    const [selectedSecretaryId, setSelectedSecretaryId] = useState(0);
    const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

    const { scheduleThesis } = useThesisRequest();
    const { getAvailableRoom } = useRoomRequest();

    const fetchAvailability = async () => {
        if (!selectedRoomId || !date) return;
        try {
            const response = await getAvailableRoom(selectedRoomId, date);
            if (Array.isArray(response?.data)) {
                setUnavailableTimes(response.data);
            } else {
                setUnavailableTimes([]);
                console.warn("Expected array of unavailable times, got:", response);
            }
        } catch (err) {
            console.error("Error fetching availability", err);
            setUnavailableTimes([]);
        }
    };

    useEffect(() => {
        if (thesisData?.defense_date) {
            const dateObj = new Date(thesisData.defense_date);
            const formattedDate = new Intl.DateTimeFormat("en-CA", {
                timeZone: "Asia/Manila",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(dateObj);
            setDate(formattedDate);
        } else {
            setDate("");
        }

        if (thesisData?.defense_time) {
            const timeObj = new Date(thesisData.defense_time);
            const formattedTime = timeObj.toLocaleTimeString("en-PH", {
                timeZone: "Asia/Manila",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(formattedTime);
        } else {
            setTime("");
        }

        setSelectedRoomId(thesisData?.room?.id || 0);
        setSelectedSecretaryId(thesisData?.secretary?.id || 0);
        setSelectedAdvisers(thesisData?.panelists?.map((p) => p.id) || []);
    }, [thesisData]);

    useEffect(() => {
        fetchAvailability();
    }, [selectedRoomId, date]);

    const handleAdviserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, (o) => Number(o.value));
        if (selected.length <= 3) setSelectedAdvisers(selected);
    };

    const handleSubmit = async () => {
        if (!date || !time || !selectedRoomId || selectedAdvisers.length === 0 || !selectedSecretaryId) {
            showToast("Please fill out all required fields.", "error");
            return;
        }

        const data = {
            id: thesisData?.id,
            defense_date: new Date(`${date}T00:00:00+08:00`),
            defense_time: new Date(`${date}T${time}:00+08:00`),
            room_id: selectedRoomId,
            panelists: selectedAdvisers,
            thesis_secretary_id: selectedSecretaryId,
        };

        setLoading(true);
        try {
            const res = await scheduleThesis(data);
            if (res) {
                showToast("Thesis schedule updated successfully.", "success");
                setIsUpdated(true);
                setIsModalOpen(false);
            } else {
                showToast("Failed to update thesis.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Something went wrong.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <label className="font-medium">
                Select Room:
                <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(Number(e.target.value))}
                    className="block w-full p-2 mt-1 border rounded-lg"
                >
                    <option value={0}>-- Select Room --</option>
                    {roomData.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name} ({room.location || "No location"})
                        </option>
                    ))}
                </select>
            </label>

            <label className="font-medium">
                Select Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full p-2 mt-1 border rounded-lg"
                />
            </label>

            <label className="font-medium">
                Select Time:
                <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full p-2 mt-1 border rounded-lg"
                >
                    <option value="">-- Select Time --</option>
                    {TIME_OPTIONS.map((t) => (
                        <option
                            key={t}
                            value={t}
                            disabled={unavailableTimes.includes(t) && t !== time}
                        >
                            {format12Hour(t)} {unavailableTimes.includes(t) && t !== time ? "(Occupied)" : ""}
                        </option>
                    ))}
                </select>
            </label>

            <label className="font-medium">
                Select Thesis Secretary:
                <select
                    value={selectedSecretaryId}
                    onChange={(e) => setSelectedSecretaryId(Number(e.target.value))}
                    className="block w-full p-2 mt-1 border rounded-lg"
                >
                    <option value={0}>-- Select Secretary --</option>
                    {adviserData.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                            {sec.user.first_name} {sec.user.last_name}
                        </option>
                    ))}
                </select>
            </label>

            <div>
                <label className="block font-semibold mb-1">Select Panelists (Max 3)</label>
                <select
                    multiple
                    value={selectedAdvisers.map(String)}
                    onChange={handleAdviserSelection}
                    className="w-full p-2 border rounded-md bg-white"
                >
                    {adviserData.map((adviser) => (
                        <option
                            key={adviser.id}
                            value={adviser.id}
                            disabled={selectedAdvisers.length >= 4 && !selectedAdvisers.includes(adviser.id)}
                        >
                            {adviser.user.first_name} {adviser.user.last_name}
                        </option>
                    ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple advisers</p>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={
                    loading || !date || !time || !selectedRoomId ||
                    !selectedSecretaryId || selectedAdvisers.length === 0
                }
                className="w-full mt-4 py-2 bg-bgPrimary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </div>
    );
};

export default ScheduleThesisModal;
