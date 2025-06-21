import { useEffect, useState } from "react";
import Modal from "@/components/organisms/Modal";
import { Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import ScheduleThesisModal from "@/components/organisms/Thesis/ScheduleThesisModal";
import useAdviserRequest from "@/hooks/adviser";

interface ThesisInfoCardProp {
    thesisData: Thesis | null;
    setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisInfoCard: React.FC<ThesisInfoCardProp> = ({ thesisData, setIsUpdated }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const userData = getUserInfoFromCookies();

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
        <div className='border border-gray-200 rounded-md p-2 px-4 mb-4'>
            <div className='flex align-center justify-between border-b border-gray-300 py-2'>
                <h4 className='font-bold text-lg'>Information</h4>
                {userData?.role === "adviser" && (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Update Info
                    </button>
                )}
            </div>
            <div className='py-4'>
                <p className='pb-1'>
                    <span className="font-semibold text-sm text-gray-600">Thesis Adviser</span>
                    <span className="block ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.adviser?.user?.first_name ? `${thesisData.adviser.user?.first_name} ${thesisData.adviser.user?.last_name} (${thesisData.adviser.user?.position} - ${thesisData.adviser.user?.program ?? "Main" })` : "No Adviser Assigned"}
                    </span>
                </p>
                <p className='py-1'>
                    <span className="font-semibold text-sm text-gray-600">Defense Date</span> 
                    <span className="block ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.defense_date ? new Date(thesisData.defense_date).toDateString() : "To be Announced"}
                    </span>
                </p>
                <p className='py-1'>
                    <span className="font-semibold text-sm text-gray-600">Defense Time</span> 
                    <span className="block ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.defense_time ? `${new Date(thesisData.defense_time).toLocaleTimeString()} - ${new Date(new Date(thesisData.defense_time).getTime() + 60 * 60 * 1000).toLocaleTimeString()}` : "To be Announced"}
                    </span>
                </p>
                <p className='py-1'>
                    <span className="font-semibold text-sm text-gray-600">Assigned Room</span> 
                    <span className="block ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.room?.name ? thesisData?.room?.name : "To be Announced"}
                    </span>
                </p>
                <p className="py-1">
                    <span className="font-semibold text-sm text-gray-600">Panelists</span>{" "}
                    {!thesisData?.panelists || thesisData.panelists.length === 0 ? (
                        <span className="block ml-4 text-lg font-semibold text-textPrimary">No Panelist Assigned</span>
                    ) : (
                        thesisData.panelists.map((panelist, index) => (
                            <span key={index} className="block ml-4 text-lg font-semibold text-textPrimary">{panelist.user?.first_name} {panelist.user?.last_name}</span>
                        ))
                    )}
                </p>
                <p className='py-1'>
                    <span className="font-semibold text-sm text-gray-600">Secretary</span> 
                    <span className="block ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.thesisSecretary?.user?.first_name ? ` ${thesisData?.thesisSecretary?.user?.first_name} ${thesisData?.thesisSecretary?.user?.last_name}` : " No Adviser Assigned"}
                    </span>
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
