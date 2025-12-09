"use client";

import { useState } from "react";

import { Attachment } from "@/interface/thesis.interface";

import AttachmentCard from "@/components/molecules/AttachmentCard";

import Modal from "@/components/organisms/Modal";
import ManageAttachmentModal from "@/components/organisms/Modals/ManageAttachmentModal";

import ActionButton from "@/components/molecules/ActionButton";

interface AttachmentCardList {
  thesisId: number;
  attachments: Attachment[];
  status?: string;
  setIsUpdated: (isUpdated: boolean) => void;
}

const AttachmentCardList: React.FC<AttachmentCardList> = ({
  thesisId,
  attachments,
  status,
  setIsUpdated,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const getCardTitle = (
    type: string,
    index: number,
    status?: string,
    title?: string
  ) => {
    let sectionName = "";
    switch (type) {
      case "proposal":
        sectionName = "Thesis Proposal Document";
        break;
      case "urec":
        sectionName = "UREC Document";
        break;
      case "twd":
        sectionName = "TWD Document";
        break;
      case "grammarian":
        sectionName = "Grammarian Report";
        break;
      case "statistician":
        sectionName = "Statistician Report";
        break;
      default:
        sectionName = "Attachment";
    }

    if (index === 0 && !title) {
      return `Initial ${sectionName}`;
    } else {
      if (status === "pending_review") {
        return `${title} (Pending)`;
      } else {
        return title;
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between pt-4">
          <h3 className="text-content-primary text-md font-bold">
            Information
          </h3>
          {/* {userData?.role === "admin" && ( */}
          <ActionButton
            icon="add_link"
            label="Add Link"
            onClick={() => setModalOpen(true)}
          />
          {/* // )} */}
        </div>
        {["proposal", "urec", "twd", "grammarian", "statistician"].map(
          (type) => {
            const attachmentsByType = attachments.filter(
              (attachment) => attachment.file_type === type
            );

            if (attachmentsByType.length === 0) return null;

            let sectionTitle = "";
            switch (type) {
              case "proposal":
                sectionTitle = "Proposal Documents";
                break;
              case "urec":
                sectionTitle = "UREC Documents";
                break;
              case "twd":
                sectionTitle = "TWD Documents";
                break;
              case "grammarian":
                sectionTitle = "Grammarian Reports";
                break;
              case "statistician":
                sectionTitle = "Statistician Reports";
                break;
              default:
                sectionTitle = "Other Attachments";
            }

            return (
              <div key={type} className="mb-2">
                <h2 className="text-content-secondary text-xs font-bold pt-2">
                  {sectionTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {attachmentsByType.map((attachment, index) => (
                    <AttachmentCard
                      key={attachment.id}
                      index={index}
                      title={getCardTitle(
                        type,
                        index,
                        status,
                        attachment.title
                      )}
                      attachment={attachment}
                      file_type={type}
                      setIsUpdated={setIsUpdated}
                    />
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>

      <Modal
        title="Upload Documents"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}>
        <ManageAttachmentModal
          thesisId={thesisId}
          setIsUpdated={setIsUpdated}
          setIsModalOpen={setModalOpen}
        />
      </Modal>
    </>
  );
};

export default AttachmentCardList;
