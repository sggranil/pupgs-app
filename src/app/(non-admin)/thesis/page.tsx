"use client";

import { useState } from "react";

import { useUserThesis } from "@/hooks/thesis";
import { Thesis } from "@/interface/thesis.interface";

import Modal from "@/components/organisms/Modal";
import ManageThesisModal from "@/components/organisms/Modals/ManageThesisModal";

import ThesisCardList from "@/components/template/Thesis/ThesisCardList";
import ThesisCardContainerSkeleton from "@/components/template/SkeletonContainer/ThesisCardSkeleton";

import { useUserContext } from "@/providers/UserProvider";

export default function StudentDashboard() {
  const { user, isLoading: isUserContextLoading } = useUserContext();
  const userId = user?.id ?? Number(user?.id);

  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
    refetch,
  } = useUserThesis(userId);

  const [thesisProposalModal, setThesisProposalModal] =
    useState<boolean>(false);

  const handleThesisUpdated = () => {
    setThesisProposalModal(false);
    refetch();
  };

  const isOverallLoading = isUserContextLoading || isThesisLoading;
  const listData = thesisData?.data || ([] as Thesis[]);

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
        {/* Announcements Panel */}
        <div className="bg-white w-full md:w-1/3 ring-1 ring-black ring-opacity-10 transition-opacity px-4 pt-4 pb-2 md:mb-0 rounded-md md:block hidden">
          <div className="flex flex-col justify-between">
            <h3 className="text-content-primary text-md font-bold">
              Announcements
            </h3>
          </div>
          <p className="text-gray-500 text-center text-sm py-16">
            No announcements yet.
          </p>
        </div>

        <div className="bg-white w-full md:w-1/2 ring-1 ring-black ring-opacity-10 transition-opacity px-4 pt-4 pb-2 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-content-primary text-md font-bold">
              My Thesis
            </h1>

            <button
              onClick={() => setThesisProposalModal(true)}
              className="text-sm font-semibold rounded-md whitespace-nowrap bg-brand-primary text-app-background px-3 py-2 hover:bg-brand-primary-hover transition duration-150">
              Make a Proposal
            </button>
          </div>

          {isOverallLoading ? (
            <ThesisCardContainerSkeleton />
          ) : error ? (
            <p className="text-red-600 text-center py-8">
              Error fetching data: {error.message}
            </p>
          ) : listData.length > 0 ? (
            <ThesisCardList thesisData={listData} />
          ) : (
            <p className="text-gray-500 text-center py-24">
              No thesis proposals found. Make a proposal now.
            </p>
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
          setIsUpdated={handleThesisUpdated}
          userId={userId}
        />
      </Modal>
    </>
  );
}
