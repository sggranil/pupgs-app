"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import useSubjectRequest from "@/hooks/subject";

import SubjectCard from "@/components/molecules/SubjectCard";
import { EnrolledSubject } from "@/interface/thesis.interface";
import Modal from "../Modal";
import EnrolledSubjectModal from "./EnrolledSubjectModal";
import { getUserRoleFromCookies } from "@/utilities/AuthUtilities";

import SubjectTable from "../../molecules/SubjectTable";

interface SubjectCardListProps {
    isUpdated: boolean;
    setIsUpdated: (isUpdated: boolean) => void;
    setSubjectData: (subjectData: EnrolledSubject[]) => void;
}

const SubjectCardList: React.FC<SubjectCardListProps> = ({ isUpdated, setIsUpdated, setSubjectData }) => {
    const [ enrolledSubjectModal, setEnrolledSubjectModal ] = useState<boolean>(false);
    const [ selectedSubject, setSelectedSubject ] = useState<EnrolledSubject | null>(null);
    const [ userSubject, setUserSubject ] = useState<EnrolledSubject[] | null>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const { getAllSubject } = useSubjectRequest();
    const userRole = getUserRoleFromCookies();

    const fetchSubject = async () => {
        setLoading(true);
        const response = await getAllSubject();
        if (response) {
            setSubjectData(response.data);
            setUserSubject(response.data);
        }
        setLoading(false);
        setIsUpdated(false);
    };

    useEffect(() => {
        fetchSubject();
    }, [isUpdated]);

    return (
        <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                {loading ? (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : userSubject && userSubject.length > 0 ? (
                    userRole === "student" ? ( 
                        userSubject.map((subject) => (
                            <div 
                                className={!subject.is_confirmed ? "cursor-pointer" : ""}
                                key={subject.id} 
                                onClick={() => {
                                    if (!subject.is_confirmed) {
                                        setSelectedSubject(subject);
                                        setEnrolledSubjectModal(true);
                                    }
                                }}
                            >
                                <SubjectCard userData={subject} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <SubjectTable setIsUpdated={setIsUpdated} userData={userSubject} />
                        </div>
                    )
                ) : (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>No subjects found.</p>
                    </div>
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
}

export default SubjectCardList;
