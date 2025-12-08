"use client";

import { useState } from "react";

import { useUserThesis } from "@/hooks/thesis";
import { Thesis } from "@/interface/thesis.interface";

import Modal from "@/components/organisms/Modal";
import ManageThesisModal from "@/components/organisms/Modals/ManageThesisModal";

import ThesisCardList from "@/components/template/Thesis/ThesisCardList";
import ThesisCardSkeleton from "@/components/template/SkeletonContainer/ThesisSkeleton";

import { useUserContext } from "@/providers/UserProvider";

export default function StudentDashboard() {
  const { user, isLoading: isUserContextLoading } = useUserContext();
  const userId = user?.id ? Number(user.id) : undefined;

  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
    refetch
  } = useUserThesis(userId);

  const [thesisProposalModal, setThesisProposalModal] = useState<boolean>(false);

  const handleThesisUpdated = () => {
    setThesisProposalModal(false);
    refetch();
  };

  const isOverallLoading = isUserContextLoading || isThesisLoading;
  const listData = (thesisData?.data || [] as Thesis[]);

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
        {/* Announcements Panel */}
        <div className="bg-white w-full md:w-1/3 ring-1 ring-black ring-opacity-10 transition-opacity p-4 md:mb-0 rounded-md md:block hidden">
          <div className="flex flex-col justify-between border-b border-gray-200">
            <h3 className="text-content-primary text-md font-bold mb-2">
              Announcements
            </h3>
          </div>
          <p className="text-gray-500 text-center py-24">
            No announcements yet.
          </p>
        </div>

        <div className="bg-white w-full md:w-1/2 ring-1 ring-black ring-opacity-10 transition-opacity px-4 pt-2 pb-2 rounded-md">
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

          {isOverallLoading ? (
            <ThesisCardSkeleton />
          ) : error ? (
            <p className="text-red-600 text-center py-8">
              Error fetching data: {error.message}
            </p>) : listData.length > 0 ? (
              <ThesisCardList thesisData={listData} />
            ) : (
            <p className="text-gray-500 text-center py-24">
              No thesis proposals found. Make a proposal now!
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
        />
      </Modal>
    </>
  );
}