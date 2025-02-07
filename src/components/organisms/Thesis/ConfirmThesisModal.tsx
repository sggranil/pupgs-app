import { useEffect, useState } from "react";

import { Adviser } from "@/interface/user.interface";
import useAdviserRequest from "@/hooks/adviser";
import useThesisRequest from "@/hooks/thesis";
import { showToast } from "../Toast";

interface ConfirmThesisProps {
    thesisId: number | undefined;
}

const ConfirmThesisModal: React.FC<ConfirmThesisProps> = ({ thesisId }) => {
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedAdviser, setSelectedAdviser] = useState<number | null>(null);
    const { getAllAdviser } = useAdviserRequest();
    const { confirmedThesis } = useThesisRequest();

    async function handleConfirmThesisModal() {
        if (!selectedAdviser) {
            alert("Please select an adviser before confirming.");
            return;
        }

        try {
            const data = {
                id: thesisId,
                is_confirmed: true,
                adviser_id: selectedAdviser,
            };

            const response = await confirmedThesis(data);
            if (response) {
                showToast("Thesis confirmed successfully", "success")
            } else {
                showToast("Failed to confirm thesis", "error")
            }
        } catch (error) {
            showToast("Error confirming thesis: " + error, "error")
        }
    }

    const fetchAdvisers = async () => {
        try {
            const response = await getAllAdviser();
            if (response?.data) {
                setAdviserData(response.data);
            } else {
                setAdviserData([]);
            }
        } catch (error) {
            console.error("Error fetching advisers:", error);
            setAdviserData([]);
        }
    };

    useEffect(() => {
        fetchAdvisers();
    }, []);

    return (
        <div className="w-full py-4">
            <div className="mb-4">
                <label className="block text-textPrimary font-semibold mb-1">
                    Select Thesis Adviser *
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                    value={selectedAdviser ?? ""}
                    onChange={(e) => setSelectedAdviser(Number(e.target.value))}
                >
                    <option value="" disabled>
                        Select Adviser
                    </option>
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
            </div>
            <button
                type="submit"
                onClick={handleConfirmThesisModal}
                disabled={!selectedAdviser || loading}
                className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
            >
                {loading ? "Processing..." : "Confirm"}
            </button>
        </div>
    );
};

export default ConfirmThesisModal;
