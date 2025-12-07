"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import { Thesis } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";

import Modal from "@/components/organisms/Modal";
import ManageThesisModal from "@/components/organisms/Modals/ManageThesisModal";

import ThesisCardList from "@/components/template/Thesis/ThesisCardList";
import ThesisCardSkeleton from "@/components/template/SkeletonContainer/ThesisSkeleton";

import { showToast } from "@/components/template/Toaster";
import { useUserContext } from "@/context/UserContext";

export default function StudentDashboard() {
  const { user, isLoading: isUserContextLoading } = useUserContext();
  const { getUserThesis } = useThesisRequest();

  const [thesisData, setThesisData] = useState<Thesis[]>([]);
  const [thesisProposalModal, setThesisProposalModal] =
    useState<boolean>(false);
  const [isThesisUpdated, setIsThesisUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function onStudentThesisFetch(studentId: number) {
    try {
      const request = await getUserThesis(studentId);
      setThesisData(request.data);
    } catch (err: any) {
      showToast(
        "Unable to process your request. " + err.message,
        "error",
        "Server Error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isUserContextLoading) {
      setIsLoading(true);
      return;
    }

    if (user) {
      const studentId = Number(user.id);

      if (isNaN(studentId)) {
        setIsLoading(false);
        showToast("Invalid User ID.", "error", "Authentication Error");
        return;
      }

      onStudentThesisFetch(studentId);
    } else {
      setIsLoading(false);
    }
  }, [isThesisUpdated, user, isUserContextLoading]);

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
        <div className="bg-white w-full md:w-1/3 ring-1 ring-black ring-opacity-10 transition-opacity p-4 md:mb-0 rounded-md md:block hidden">
          <div className="flex flex-col justify-between border-b border-gray-200">
            <h3 className="text-content-primary text-md font-bold mb-2">
              Announcements
            </h3>
          </div>
        </div>

        <div className="bg-white w-full md:w-1/2 ring-1 ring-black ring-opacity-10 transition-opacity p-4 rounded-md">
          <div className="flex items-center justify-between border-b border-gray-200">
            <h1 className="text-content-primary text-lg font-bold">
              My Thesis
            </h1>

            <button
              onClick={() => setThesisProposalModal(true)}
              className="text-sm font-semibold rounded-md whitespace-nowrap bg-brand-primary text-app-background px-3 py-2 hover:bg-brand-primary-hover transition duration-150 mb-2">
              Make a Proposal
            </button>
          </div>
          {isLoading ? (
            <ThesisCardSkeleton />
          ) : (
            <ThesisCardList thesisData={thesisData} />
          )}
        </div>
      </div>

      <Modal
        title="Upload Proposal/Concept Paper"
        isModalOpen={thesisProposalModal}
        modalType="form"
        setModalOpen={setThesisProposalModal}>
        <ManageThesisModal
          setIsModalOpen={setThesisProposalModal}
          setIsUpdated={setIsThesisUpdated}
        />
      </Modal>
    </>
  );
}
