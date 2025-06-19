"use client";

import { useEffect, useState } from "react";

import { EnrolledSubject } from "@/interface/thesis.interface";

import useSubjectRequest from "@/hooks/subject";

import Modal from "../Modal";
import EnrolledSubjectModal from "./EnrolledSubjectModal";
import SubjectCard from "@/components/molecules/SubjectCard";
import SubjectTable from "./SubjectTable";

import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface SubjectCardListProps {
  isUpdated: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
  setSubjectData: (subjectData: EnrolledSubject[]) => void;
}

const SubjectCardList: React.FC<SubjectCardListProps> = ({ isUpdated, setIsUpdated, setSubjectData }) => {
  const [enrolledSubjectModal, setEnrolledSubjectModal] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<EnrolledSubject | null>(null);
  const [userSubject, setUserSubject] = useState<EnrolledSubject[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllSubject } = useSubjectRequest();

  const userData = getUserInfoFromCookies();

  const fetchSubject = async () => {
    setLoading(true);

    const response = await getAllSubject();

    if (response) {
      const allSubjects = response.data;

      if (userData?.role === "student") {
        const studentSubjects = allSubjects.filter(
          (subject: any) => subject.student.user_id === userData?.userId
        );
        setUserSubject(studentSubjects);
        setSubjectData(studentSubjects);
      } else {
        setUserSubject(allSubjects);
        setSubjectData(allSubjects)
      }
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
          userData?.role === "student" ? (
            userSubject.map((subject) => (
              <div
                className="cursor-pointer"
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject);
                  setEnrolledSubjectModal(true);
                }}>
                <SubjectCard userData={subject} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <SubjectTable
                setIsUpdated={setIsUpdated}
                userData={userSubject}
              />
            </div>
          )
        ) : (
          <div className="h-48 col-span-full flex flex-col justify-center items-center space-y-4">
            <p>Upload your receipt to confirm payment.</p>
          </div>
        )}
      </div>

      <Modal
        title="Receipt Information"
        isModalOpen={enrolledSubjectModal}
        setModalOpen={setEnrolledSubjectModal}>
        {!selectedSubject?.is_confirmed && !selectedSubject?.message ? (
          <EnrolledSubjectModal
            subjectData={selectedSubject}
            setIsUpdated={setIsUpdated}
            setIsModalOpen={setEnrolledSubjectModal}
          />
        ) : !selectedSubject?.is_confirmed && selectedSubject?.message ? (
          <div className="pt-6">
            Your receipt with Official Receipt <strong>#{selectedSubject?.or_number}</strong> has been flagged by our staff.
            <div className="py-4">
              <p><strong>Status:</strong> {selectedSubject?.is_confirmed ? "Confirmed" : "Denied"}</p>
              <p><strong>Notes:</strong> {selectedSubject?.message}</p>
            </div>
          </div>
        ) : (
          <div className="pt-6">
            Your receipt with Official Receipt <strong>#{selectedSubject?.or_number}</strong> has been checked by our staff.
            <div className="py-4">
              <p><strong>Status:</strong> {selectedSubject?.message ? "Confirmed" : "Denied"}</p>
              <p><strong>Notes:</strong> {selectedSubject?.message}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubjectCardList;
