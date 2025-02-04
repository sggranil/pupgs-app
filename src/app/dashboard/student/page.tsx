"use client";
import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import React from "react";
import AddThesis from "@/components/organisms/AddThesis";

export default function StudentDashboard() {
    const [enrolledSubjectModal, setEnrolledSubjectModal] = useState<boolean>(false);
    const [thesisProposalModal, setThesisProposalModal] = useState<boolean>(false);

    return (
        <div>
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Currently Enrolled Subject
                    </h1>
                    <button
                        onClick={() => setEnrolledSubjectModal(true)}
                        className="px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Upload Documents
                    </button>
                </div>
            </div>
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Your Thesis
                    </h1>
                    <button
                        onClick={() => setThesisProposalModal(true)}
                        className="px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Add a Thesis Proposal
                    </button>
                </div>
            </div>
            <Modal title="Upload Documents" isModalOpen={enrolledSubjectModal} setModalOpen={setEnrolledSubjectModal}>
                <AddThesis />
            </Modal>
            <Modal title="Add Thesis" isModalOpen={thesisProposalModal} setModalOpen={setThesisProposalModal}>
                <AddThesis />
            </Modal>
        </div>
    );
}
