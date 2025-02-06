"use client";
import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import React from "react";
import AddThesisModal from "@/components/organisms/Thesis/AddThesisModal";
import EnrolledSubjectModal from "@/components/organisms/Subject/EnrolledSubjectModal";
import SubjectCardList from "@/components/organisms/Subject/SubjectCardList";
import ThesistCardList from "@/components/organisms/Thesis/ThesisCardList";

export default function StudentDashboard() {
    const [ enrolledSubjectModal, setEnrolledSubjectModal ] = useState<boolean>(false);
    const [ thesisProposalModal, setThesisProposalModal ] = useState<boolean>(false);
    const [ isSubjectUpdated, setIsSubjectUpdated ] = useState<boolean>(false);
    const [ isThesisUpdated, setIsThesisUpdated ] = useState<boolean>(false);

    return (
        <div className="h-1/3">
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Enrolled Subject
                    </h1>
                    <button
                        onClick={() => setEnrolledSubjectModal(true)}
                        className="h-10 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Upload Documents
                    </button>
                </div>
                <SubjectCardList setIsUpdated={setIsSubjectUpdated} isUpdated={isSubjectUpdated} />
            </div>
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Your Thesis
                    </h1>
                    <button
                        onClick={() => setThesisProposalModal(true)}
                        className="h-10 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Add a Thesis Proposal
                    </button>
                </div>
                <ThesistCardList setIsUpdated={setIsThesisUpdated} isUpdated={isThesisUpdated} />
            </div>
            <div className="h-0">
                <Modal title="Upload Documents" isModalOpen={enrolledSubjectModal} setModalOpen={setEnrolledSubjectModal}>
                    <EnrolledSubjectModal setIsModalOpen={setEnrolledSubjectModal} setIsUpdated={setIsSubjectUpdated} />
                </Modal>
                <Modal title="Add Thesis" isModalOpen={thesisProposalModal} setModalOpen={setThesisProposalModal}>
                    <AddThesisModal setIsModalOpen={setThesisProposalModal} setIsUpdated={setIsThesisUpdated} />
                </Modal>
            </div>
        </div>
    );
}
