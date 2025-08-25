"use client";

import { useEffect, useState } from "react";

import { Proposal } from "@/interface/thesis.interface";
import useProposalRequest from "@/hooks/proposal";

import ProposalCard from "@/components/molecules/ProposalCard";
import Modal from "../Modal";
import AddRevisedProposalModal from "./AddRevisedProposalModal";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface ProposalCardList {
    thesisId: string;
    status: string
}

const ProposalCardList: React.FC<ProposalCardList> = ({ thesisId, status }) => {
    const [userProposal, setUserProposal] = useState<Proposal[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [proposalModal, setProposalModal] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    const userData = getUserInfoFromCookies();

    const { getProposal } = useProposalRequest();

    const fetchProposal = async () => {
        setLoading(true);
        const response = await getProposal(Number(thesisId));
        if (response) {
            setUserProposal(response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposal();
    }, [isUpdated]);

    return (
        <div className="border border-gray-200 rounded-md p-2 px-4 mb-4">
            <div className="flex align-center justify-between py-2 border-b border-gray-200">
                <h4 className='font-bold text-lg'>Paper Proposal</h4>
                {userData?.role === "student" && (
                    <button
                        onClick={() => setProposalModal(true)}
                        className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Add Documents
                    </button>
                )}

            </div>
            <div className="grid grid-cols-2 gap-2 py-2">
                {loading ? (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : userProposal && userProposal.length > 0 ? (
                    userProposal.map((data, index) => (
                        <div
                            key={data.id}
                        >
                            <ProposalCard
                                setIsUpdated={setIsUpdated}
                                index={index}
                                title={
                                    index === 0
                                        ? `Initial Concept Paper`
                                        : status === "pending_review"
                                            ? `Concept Paper Revision ${index}`
                                            : `Thesis Revision No. ${index}`
                                }
                                proposal={data}
                            />
                        </div>
                    ))
                ) : (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>No proposal found.</p>
                    </div>
                )}
            </div>
            <Modal title="Upload Documents" isModalOpen={proposalModal} setModalOpen={setProposalModal}>
                <AddRevisedProposalModal
                    thesisId={thesisId}
                    setIsUpdated={setIsUpdated}
                    setIsModalOpen={setProposalModal}
                />
            </Modal>
        </div>
    );

};

export default ProposalCardList;
