"use client";

import { useEffect, useState } from "react";

import { Proposal } from "@/interface/thesis.interface";
import useProposalRequest from "@/hooks/proposal";

import ProposalCard from "@/components/molecules/ProposalCard";
import Modal from "../Modal";
import AddRevisedProposalModal from "./AddRevisedProposalModal";
import { getUserRoleFromCookies } from "@/utilities/AuthUtilities";

interface ProposalCardList {
    thesisId: string;
}

const ProposalCardList: React.FC<ProposalCardList> = ({ thesisId }) => {
    const [ userProposal, setUserProposal ] = useState<Proposal[] | null>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ proposalModal, setProposalModal ] = useState<boolean>(false);
    const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

    const userRole = getUserRoleFromCookies();

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
        <div className="h-full">
            <div className="flex align-center justify-between py-2 border-b border-gray-200">
                <h1 className="text-md font-semibold p-2">
                    Paper Proposal
                </h1>
                {userRole === "student" && (
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
                            <ProposalCard setIsUpdated={setIsUpdated} index={index} title={index === 0 ? `Initial Concept Paper` : `Revision No. ${index}`} proposal={data} />
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
