"use client";

import { useEffect, useState } from "react";

import {
  Attachment,
  Thesis,
  ThesisReceipt,
} from "@/interface/thesis.interface";

import Modal from "@/components/organisms/Modal";

import ActionButton from "@/components/molecules/ActionButton";
import ThesisReceiptsCard from "@/components/molecules/ThesisReceiptsCard";
import ManageThesisReceiptModal from "@/components/organisms/Modals/ManageThesisReceiptModal";
import { UserData } from "@/interface/user.interface";

interface ThesisReceiptCardListProps {
  user?: UserData | null;
  thesisId: number;
  receipts?: ThesisReceipt[];
  setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisReceiptCardList: React.FC<ThesisReceiptCardListProps> = ({
  user,
  receipts,
  thesisId,
  setIsUpdated,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between pt-4 pb-3 ">
          <h3 className="text-content-primary text-md font-bold">
            Thesis Receipts
          </h3>
          {user?.role === "student" && (
            <ActionButton
              icon="upload"
              label="Upload"
              onClick={() => setModalOpen(true)}
            />
          )}
        </div>
        {receipts!.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
            {receipts?.map((receipt, index) => (
              <ThesisReceiptsCard
                user={user}
                thesisId={thesisId}
                key={index}
                receipts={receipt}
                setIsUpdated={setIsUpdated}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-12">
            No thesis receipts yet.
          </p>
        )}
      </div>
      <Modal
        title="Upload Receipt"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        modalType="info">
        <ManageThesisReceiptModal
          userId={user?.id}
          thesisId={thesisId}
          setIsModalOpen={setModalOpen}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
    </>
  );
};

export default ThesisReceiptCardList;
