"use client";

import React, { useState } from "react";

import Modal from "@/components/organisms/Modal";
import AddThesisModal from "@/components/organisms/Thesis/AddThesisModal";
import EnrolledSubjectModal from "@/components/organisms/Subject/EnrolledSubjectModal";
import SubjectCardList from "@/components/organisms/Subject/SubjectCardList";
import ThesisCardList from "@/components/organisms/Thesis/ThesisCardList";

import { EnrolledSubject } from "@/interface/thesis.interface";

export default function Dashboard() {
    const [ enrolledSubjectModal, setEnrolledSubjectModal ] = useState<boolean>(false);
    const [ thesisProposalModal, setThesisProposalModal ] = useState<boolean>(false);
    const [ isSubjectUpdated, setIsSubjectUpdated ] = useState<boolean>(false);
    const [ isThesisUpdated, setIsThesisUpdated ] = useState<boolean>(false);
    const [ subjectData, setSubjectData ] = useState<EnrolledSubject[] | null>([]);

    // const isSubjectConfirmed = subjectData?.some(subject => subject.is_confirmed) ?? false;

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
                        Dashboard
                    </h1>
                </div>
            </div>
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Check Enrollees
                    </h1>
                </div>
                <SubjectCardList setSubjectData={setSubjectData} setIsUpdated={setIsSubjectUpdated} isUpdated={isSubjectUpdated} />
            </div>
            <div className="w-full px-2 pt-6 pb-12">
                <div className="flex align-center justify-between py-2 border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Thesis
                    </h1>
                </div>
                <ThesisCardList setIsUpdated={setIsThesisUpdated} isUpdated={isThesisUpdated} />
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
