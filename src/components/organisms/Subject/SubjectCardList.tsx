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

const SubjectCardList: React.FC<SubjectCardListProps> = ({
  isUpdated,
  setIsUpdated,
  setSubjectData,
}) => {
  const [enrolledSubjectModal, setEnrolledSubjectModal] =
    useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] =
    useState<EnrolledSubject | null>(null);
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
        setSubjectData(allSubjects);
      }
    }

    setLoading(false);
    setIsUpdated(false);
  };

  useEffect(() => {
    fetchSubject();
  }, [isUpdated]);

  const handleCardClick = (subject: EnrolledSubject) => {
    setSelectedSubject(subject);
    setEnrolledSubjectModal(true);
  };

  const renderModalContent = () => {
    if (!selectedSubject) return null;

    // Student view
    if (userData?.role === "student") {
      switch (selectedSubject.status) {
        case "pending_review":
          return (
            <div className="pt-6">
              <p className="font-semibold text-lg">Receipt Status</p>
              <p>
                Your receipt with Official Receipt{" "}
                <strong>#{selectedSubject.or_number}</strong> is currently
                <strong> pending review</strong> by the staff.
              </p>
            </div>
          );
        case "reupload_required":
        case "invalid":
        case "rejected":
          return (
            <EnrolledSubjectModal
              userId={userData?.userId}
              subjectData={selectedSubject}
              setIsUpdated={setIsUpdated}
              setIsModalOpen={setEnrolledSubjectModal}
            />
          );
        case "confirmed":
        case "acknowledged":
          return (
            <div className="pt-6">
              <p className="font-semibold text-lg">Receipt Status</p>
              <p>
                Your receipt with Official Receipt{" "}
                <strong>#{selectedSubject.or_number}</strong> has been processed
                by our staff.
              </p>
              <div className="py-4">
                <p className="capitalize">
                  <strong>Status:</strong> {selectedSubject.status}
                </p>
                {selectedSubject.message && (
                  <p>
                    <strong>Notes:</strong> {selectedSubject.message}
                  </p>
                )}
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    // Admin/Adviser view
    if (userData?.role === "admin" || userData?.role === "adviser") {
      return (
        <EnrolledSubjectModal
          userId={userData?.userId}
          subjectData={selectedSubject}
          setIsUpdated={setIsUpdated}
          setIsModalOpen={setEnrolledSubjectModal}
        />
      );
    }

    return null;
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
        {loading ? (
          <div className="h-48 col-span-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : userSubject && userSubject.length > 0 ? (
          userData?.role === "student" ? (
            userSubject.map((subject) => {
              const isDisabled = subject.status === "pending_review";

              return (
                <div
                  key={subject.id}
                  className={`cursor-pointer ${
                    isDisabled ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => !isDisabled && handleCardClick(subject)}
                  title={isDisabled ? "Pending review, cannot edit" : ""}>
                  <SubjectCard subjectData={subject} />
                </div>
              );
            })
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
            <p>
              {userData?.role === "admin"
                ? "No receipt data available."
                : "Upload your receipt to confirm payment"}
            </p>
          </div>
        )}
      </div>

      <Modal
        title="Receipt Information"
        isModalOpen={enrolledSubjectModal}
        setModalOpen={setEnrolledSubjectModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default SubjectCardList;
