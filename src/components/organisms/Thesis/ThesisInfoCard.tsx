import { useState } from "react";
import { EnrolledSubject, Room, Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

import Modal from "@/components/organisms/Modal";
import ScheduleThesisModal from "@/components/organisms/Thesis/ScheduleThesisModal"

interface ThesisInfoCardProp {
    thesisData: Thesis | null;
    adviserData: Adviser[];
    roomData: Room[];
    subjectData?: EnrolledSubject | null;
    setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisInfoCard: React.FC<ThesisInfoCardProp> = ({ thesisData, adviserData, roomData, subjectData, setIsUpdated }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const userData = getUserInfoFromCookies();

    return (
        <div className='border border-gray-200 rounded-md p-2 px-4 mb-4'>
            <div className='flex items-center justify-between border-b border-gray-300 py-2'>
                <h4 className='font-bold text-lg'>Information</h4>
                {userData?.role === "admin" && (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Update Info
                    </button>
                )}
            </div>

            <div className='py-4 space-y-3'>
                {/* Adviser */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Thesis Adviser</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.adviser?.user
                            ? `${thesisData.adviser.user.first_name} ${thesisData.adviser.user.last_name} (${thesisData.adviser.user.position ?? "N/A"} - ${thesisData.adviser.user.program ?? "Main"})`
                            : "No Adviser Assigned"}
                    </p>
                </div>

                {/* Date */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Defense Date</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.defense_date
                            ? new Date(new Date(thesisData.defense_date).toLocaleString("en-US", { timeZone: "Asia/Manila" })).toDateString()
                            : "To be Announced"}
                    </p>
                </div>

                {/* Time */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Defense Time</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.defense_time
                            ? (() => {
                                const start = new Date(new Date(thesisData.defense_time).toLocaleString("en-US", { timeZone: "Asia/Manila" }));
                                const end = new Date(start.getTime() + 60 * 60 * 1000);
                                return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                            })()
                            : "To be Announced"}
                    </p>
                </div>

                {/* Room */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Assigned Room</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.room
                            ? `${thesisData.room.name}${thesisData.room.location ? ` (${thesisData.room.location})` : ""}`
                            : "To be Announced"}
                    </p>
                </div>

                {/* Panelists */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Panelists</span>
                    {thesisData?.panelists && thesisData.panelists.length > 0 ? (
                        thesisData.panelists.map((panelist, idx) => (
                            <p key={idx} className="ml-4 text-lg font-semibold text-textPrimary">
                                {panelist.user?.first_name} {panelist.user?.last_name}
                            </p>
                        ))
                    ) : (
                        <p className="ml-4 text-lg font-semibold text-textPrimary">No Panelist Assigned</p>
                    )}
                </div>

                {/* Secretary */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Secretary</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {thesisData?.secretary?.user
                            ? `${thesisData.secretary.user.first_name} ${thesisData.secretary.user.last_name}`
                            : "No Secretary Assigned"}
                    </p>
                </div>
            </div>

            <Modal title="Update Information" isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
                <ScheduleThesisModal
                    thesisData={thesisData}
                    adviserData={adviserData}
                    roomData={roomData}
                    setIsModalOpen={setModalOpen}
                    setIsUpdated={setIsUpdated}
                />
            </Modal>
        </div>
    );
};

export default ThesisInfoCard;
