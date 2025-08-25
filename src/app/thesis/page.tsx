"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import AddThesisModal from "@/components/organisms/Thesis/AddThesisModal";
import ThesisCardList from "@/components/organisms/Thesis/ThesisCardList";
import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";
import useSubjectRequest from "@/hooks/subject";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

export default function StudentDashboard() {
    const [ thesisProposalModal, setThesisProposalModal ] = useState<boolean>(false);
    const [ isThesisUpdated, setIsThesisUpdated ] = useState<boolean>(false);
    const [ subjectData, setSubjectData ] = useState<EnrolledSubject[] | null>([]);
    const { getAllSubject } = useSubjectRequest();

    const fetchSubject = async () => {
        const response = await getAllSubject();
        if (response) {
            setSubjectData(response.data);
        }
    };

    const userData = getUserInfoFromCookies();
    
    useEffect(() => {
        fetchSubject();
    }, []);

    return (
        <div className="h-1/3">
            <div className="w-full h-1/3 py-12 rounded-md"
                style={{
                    backgroundImage:
                        "url('/maroon-bg.jpg')",
                }}
            >
                <div className="flex align-center justify-between">
                    <h1 className="text-white text-xl font-bold p-2 pl-4">
                        Your Thesis
                    </h1>
                    {userData?.role == "student" && 
                        <button
                            onClick={() => setThesisProposalModal(true)}
                            className="h-10 mx-2 px-3 py-2 text-sm font-semibold rounded-md whitespace-nowrap bg-white text-textPrimary"
                        >
                            Upload Proposal
                        </button>
                    }
                </div>
                <ThesisCardList setIsUpdated={setIsThesisUpdated} isUpdated={isThesisUpdated} />
                
            </div>
            <div className="h-0">
                <Modal title="Upload Concept Paper" isModalOpen={thesisProposalModal} setModalOpen={setThesisProposalModal}>
                    <AddThesisModal setIsModalOpen={setThesisProposalModal} setIsUpdated={setIsThesisUpdated} />
                </Modal>
            </div>
        </div>
    );
}
