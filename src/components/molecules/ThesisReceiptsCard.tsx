"use client";

import { useState } from "react";

import { ThesisReceipt } from "@/interface/thesis.interface";
import { formatStatus } from "@/utilities/StringFormatter";

import Modal from "@/components/organisms/Modal";
import ManageThesisReceiptModal from "@/components/organisms/Modals/ManageThesisReceiptModal";
import { UserData } from "@/interface/user.interface";

interface ThesisReceiptsCardProps {
  user?: UserData | null;
  thesisId?: number;
  receipts: ThesisReceipt;
  setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisReceiptsCard: React.FC<ThesisReceiptsCardProps> = ({
  user,
  thesisId,
  receipts,
  setIsUpdated,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  if (isModalOpen) {
    return (
      <Modal
        title="Upload Receipt"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        modalType="info">
        <ManageThesisReceiptModal
          userId={user?.id}
          thesisId={thesisId}
          receiptData={receipts}
          setIsModalOpen={setModalOpen}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
    );
  }

  const handleReceiptClick =
    user?.role === "student" ? () => setModalOpen(true) : undefined;

  return (
    <>
      <div className="w-full ring-1 ring-black ring-opacity-10 transition-opacity rounded-sm cursor-pointer">
        <div
          onClick={() => handleReceiptClick}
          className="flex items-center justify-between py-2 px-3">
          <div>
            <h2 className="text-sm font-bold text-content-primary">
              {formatStatus(receipts.receipt_name)}
            </h2>
            <p className="text-xs font-semibold text-content-primary">
              OR #{receipts.or_number}
            </p>
            <p className="text-xs text-gray-500 pt-1">
              Status: {formatStatus(receipts.status)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThesisReceiptsCard;
