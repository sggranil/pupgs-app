"use client";

import { useState } from "react";

import { Thesis } from "@/interface/thesis.interface";

import Modal from "@/components/organisms/Modal";
import ScheduleThesisModal from "@/components/organisms/Modals/ScheduleThesisModal";

import ActionButton from "@/components/molecules/ActionButton";

interface ThesisInformationProps {
  thesisData: Thesis;
  setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisInformation: React.FC<ThesisInformationProps> = ({
  thesisData,
  setIsUpdated,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <h3 className="text-content-primary text-md font-bold">Information</h3>
        {/* {userData?.role === "admin" && ( */}
        <ActionButton
          icon="edit_square"
          label="Edit"
          onClick={() => setModalOpen(true)}
        />
        {/* // )} */}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Thesis Adviser
          </span>
          <p className="text-sm font-bold text-context-primary">
            {thesisData?.adviser?.user
              ? `${thesisData.adviser.user.first_name} ${thesisData.adviser.user.last_name}`
              : "No Adviser Assigned"}
          </p>
        </div>

        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Defense Date
          </span>
          <p className="text-sm font-bold text-content-primary">
            {thesisData?.defense_schedule?.toLocaleDateString() ??
              "To be Announced"}
          </p>
        </div>

        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Defense Time
          </span>
          <p className="text-sm font-bold text-content-primary">
            {thesisData?.defense_schedule?.toLocaleDateString() ??
              "To be Announced"}
          </p>
        </div>

        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Assigned Room
          </span>
          <p className="text-sm font-bold text-content-primary">
            {thesisData?.room
              ? `${thesisData.room.name}${
                  thesisData.room.location
                    ? ` (${thesisData.room.location})`
                    : ""
                }`
              : "To be Announced"}
          </p>
        </div>

        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Panelists
          </span>
          {thesisData?.panelists && thesisData.panelists.length > 0 ? (
            thesisData.panelists.map((panelist, idx) => (
              <p key={idx} className="text-sm font-bold text-content-primary">
                {panelist.user?.first_name} {panelist.user?.last_name}
              </p>
            ))
          ) : (
            <p className="text-sm font-bold text-content-primary">
              No Panelist Assigned
            </p>
          )}
        </div>

        <div>
          <span className="font-semibold text-xs text-content-secondary">
            Secretary
          </span>
          <p className="text-sm font-bold text-content-primary">
            {thesisData?.secretary?.user
              ? `${thesisData.secretary.user.first_name} ${thesisData.secretary.user.last_name}`
              : "No Secretary Assigned"}
          </p>
        </div>
      </div>

      <Modal
        title="Update Information"
        modalType="info"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}>
        <ScheduleThesisModal
          thesisData={thesisData}
          setIsModalOpen={setModalOpen}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
    </>
  );
};

export default ThesisInformation;
