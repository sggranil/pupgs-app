import { useEffect, useState } from "react";
import Modal from "@/components/organisms/Modal";
import { Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import { getUserRoleFromCookies } from "@/utilities/AuthUtilities";
import ScheduleThesisModal from "@/components/organisms/Thesis/ScheduleThesisModal";
import useAdviserRequest from "@/hooks/adviser";

interface ThesisInfoCardProp {
    thesisData: Thesis | null;
    setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisInfoCard: React.FC<ThesisInfoCardProp> = ({ thesisData, setIsUpdated }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const userRole = getUserRoleFromCookies();

    const { getAllAdviser } = useAdviserRequest();

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
    }, [setIsUpdated]);

    return (
        <div className='bg-gray-100 rounded-md p-2 px-4 mb-4'>
            <div className='flex align-center justify-between border-b border-gray-300 py-2'>
                <h4 className='font-bold text-lg'>Information</h4>
                {userRole === "adviser" && (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Update Info
                    </button>
                )}
            </div>
            <div className='py-4'>
                <p className='border-b border-gray-300 pb-2'>
                    <strong>Thesis Adviser: </strong>
                    <span>
                        {thesisData?.adviser?.user?.first_name ? `${thesisData.adviser.user?.first_name} ${thesisData.adviser.user?.last_name}` : "No Adviser Assigned"}
                    </span>
                </p>
                <p className='border-b border-gray-300 py-2'>
                    <strong>Defense Date:</strong> <span>{thesisData?.defense_date ? new Date(thesisData.defense_date).toLocaleDateString() : "To be Announced"}</span>
                </p>
                <p className='border-b border-gray-300 py-2'>
                    <strong>Defense Time:</strong> <span>{thesisData?.defense_time ? new Date(thesisData.defense_time).toLocaleTimeString() : "To be Announced"}</span>
                </p>
                <p className="border-b border-gray-300 py-2">
                    <strong>Panelists:</strong>{" "}
                    {!thesisData?.panelists || thesisData.panelists.length === 0 ? (
                        <span>No Panelist Assigned</span>
                    ) : (
                        thesisData.panelists.map((panelist, index) => (
                            <span key={index} className="block">{panelist.user?.first_name} {panelist.user?.last_name}</span>
                        ))
                    )}
                </p>
            </div>
            <Modal title="Update Information" isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
                <ScheduleThesisModal 
                    thesisData={thesisData} 
                    adviserData={adviserData} 
                    setIsModalOpen={setModalOpen} 
                    setIsUpdated={setIsUpdated} 
                />
            </Modal>
        </div>
    );
}

export default ThesisInfoCard;
