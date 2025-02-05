"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import useSubjectRequest from "@/hooks/subject";

import SubjectCard from "@/components/molecules/SubjectCard";
import { EnrolledSubject } from "@/interface/thesis.interface";
import Modal from "../Modal";
import EnrolledSubjectModal from "./EnrolledSubjectModal";

interface SubjectCardListProps {
    isUpdated: boolean;
    setIsUpdated: (isUpdated: boolean) => void;
}

const SubjectCardList: React.FC<SubjectCardListProps> = ({ isUpdated, setIsUpdated }) => {
    const [ enrolledSubjectModal, setEnrolledSubjectModal ] = useState<boolean>(false);
    const [ selectedSubject, setSelectedSubject ] = useState<EnrolledSubject | null>(null);
    const [ userSubject, setUserSubject ] = useState<EnrolledSubject[] | null>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const { getSubject } = useSubjectRequest();
    const userId = Cookies.get("id");

    const fetchSubject = async () => {
        setLoading(true);
        const response = await getSubject(Number(userId));
        if (response) {
            setUserSubject(response.data);
        }
        setLoading(false);
        setIsUpdated(false);
    };

    useEffect(() => {
        fetchSubject();
    }, [isUpdated]);

    return (
        <div className="h-64">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                {loading ? (
                    <p>Loading...</p>
                ) : userSubject && userSubject.length > 0 ? (
                    userSubject.map((subject) => (
                        <div 
                            key={subject.id} 
                            onClick={() => {
                                setSelectedSubject(subject);
                                setEnrolledSubjectModal(true);
                            }}
                        >
                            <SubjectCard userData={subject} />
                        </div>
                    ))
                ) : (
                    <p>No subjects found.</p>
                )}
            </div>
            <Modal title="Upload Documents" isModalOpen={enrolledSubjectModal} setModalOpen={setEnrolledSubjectModal}>
                {selectedSubject && (
                    <EnrolledSubjectModal 
                        subjectData={selectedSubject} 
                        setIsUpdated={setIsUpdated} 
                        setIsModalOpen={setEnrolledSubjectModal} 
                    />
                )}
            </Modal>
        </div>
    );
};

export default SubjectCardList;
