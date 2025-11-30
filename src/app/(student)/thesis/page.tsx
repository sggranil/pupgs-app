"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import AddThesisModal from "@/components/templates/Thesis/AddThesisModal";
import ThesisCardList from "@/components/templates/Thesis/ThesisCardList";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

export default function StudentDashboard() {
  const [thesisProposalModal, setThesisProposalModal] =
    useState<boolean>(false);
  const [isThesisUpdated, setIsThesisUpdated] = useState<boolean>(false);
  const userData = getUserInfoFromCookies();

  return (
    <div className="flex md:flex-row flex-col gap-4 md:w-1/2 w-full md:px-0 px-8 py-4">
      <div className="bg-white md:w-1/3 w-full ring-1 ring-black ring-opacity-10 transition-opacity p-4 rounded-md">
        <p className="text-content-primary font-bold">Thesis Information/Filters</p>
      </div>

      <div className="bg-white md:w-2/3 w-full ring-1 ring-black ring-opacity-10 transition-opacity p-4 rounded-md">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-content-primary text-md font-bold">Your Thesis</h1>
            <button
              onClick={() => setThesisProposalModal(true)}
              className="text-sm font-semibold rounded-md whitespace-nowrap bg-white text-textPrimary px-3 py-1 hover:bg-gray-100 transition duration-150"
            >
              Upload Proposal
            </button>
          </div>

          <ThesisCardList
            setIsUpdated={setIsThesisUpdated}
            isUpdated={isThesisUpdated}
          />
        </div>
      </div>
    </div>
    // <div className="h-1/3">
    //   <div
    //     className="w-full h-1/3 py-12 rounded-md"
    //     style={{
    //       backgroundImage: "url('/maroon-bg.jpg')",
    //     }}>
    //     <div className="flex align-center justify-between">
    //       <h1 className="text-white text-xl font-bold p-2 pl-4">Your Thesis</h1>
    //       {userData?.role == "student" && (
    //         <button
    //           onClick={() => setThesisProposalModal(true)}
    //           className="h-10 mx-2 px-3 py-2 text-sm font-semibold rounded-md whitespace-nowrap bg-white text-textPrimary">
    //           Upload Proposal
    //         </button>
    //       )}
    //     </div>
    //     <ThesisCardList
    //       setIsUpdated={setIsThesisUpdated}
    //       isUpdated={isThesisUpdated}
    //     />
    //   </div>
    //   <div className="h-0">
    //     <Modal
    //       title="Upload Concept Paper"
    //       isModalOpen={thesisProposalModal}
    //       setModalOpen={setThesisProposalModal}>
    //       <AddThesisModal
    //         setIsModalOpen={setThesisProposalModal}
    //         setIsUpdated={setIsThesisUpdated}
    //       />
    //     </Modal>
    //   </div>
    // </div>
  );
}
