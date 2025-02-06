"use client";
import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import React from "react";
import AddThesisModal from "@/components/organisms/Thesis/AddThesisModal";
import EnrolledSubjectModal from "@/components/organisms/Subject/EnrolledSubjectModal";
import SubjectCardList from "@/components/organisms/Subject/SubjectCardList";
import ThesistCardList from "@/components/organisms/Thesis/ThesisCardList";
import { EnrolledSubject } from "@/interface/thesis.interface";

export default function AdviserDashboard() {
    const [ enrolledSubjectModal, setEnrolledSubjectModal ] = useState<boolean>(false);
    const [ thesisProposalModal, setThesisProposalModal ] = useState<boolean>(false);
    const [ isSubjectUpdated, setIsSubjectUpdated ] = useState<boolean>(false);
    const [ isThesisUpdated, setIsThesisUpdated ] = useState<boolean>(false);
    const [ subjectData, setSubjectData ] = useState<EnrolledSubject[] | null>([]);

    const isSubjectConfirmed = subjectData?.some(subject => subject.is_confirmed) ?? false;

    return (
        <div className="h-1/3">
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
                {isSubjectConfirmed ? (
                    <ThesistCardList setIsUpdated={setIsThesisUpdated} isUpdated={isThesisUpdated} />
                ) : (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>You must enroll first on Thesis Writing 1 or 2.</p>
                    </div>
                )}
                
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
