"use client";

import { useEffect, useState } from "react";

import { Attachment } from "@/interface/thesis.interface";
import useAttachmentRequest from "@/hooks/attachment";

import AttachmentCard from "@/components/molecules/AttachmentCard";
import Modal from "../Modal";
import AddRevisedAttachmentModal from "./AddRevisedAttachmentModal";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface AttachmentCardList {
  thesisId: string;
  status: string;
}

const AttachmentCardList: React.FC<AttachmentCardList> = ({
  thesisId,
  status,
}) => {
  const [userAttachment, setUserAttachment] = useState<Attachment[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [AttachmentModal, setAttachmentModal] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const userData = getUserInfoFromCookies();

  const { getAttachment } = useAttachmentRequest();

  const fetchAttachment = async () => {
    setLoading(true);
    const response = await getAttachment(Number(thesisId));
    if (response) {
      setUserAttachment(response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachment();
  }, [isUpdated]);

  return (
    <div className="border border-gray-200 rounded-md p-2 px-4 mb-4">
      <div className="flex align-center justify-between py-2 border-b border-gray-200">
        <h4 className="font-bold text-lg">Paper Attachment</h4>
        {userData?.role === "student" && (
          <button
            onClick={() => setAttachmentModal(true)}
            className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white">
            Add Documents
          </button>
        )}
      </div>
      <div className="py-2">
        {loading ? (
          <div className="h-48 col-span-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : userAttachment && userAttachment.length > 0 ? (
          ["proposal", "urec", "twd", "grammarian", "statistician"].map(
            (type) => {
              const attachmentsByType = userAttachment.filter(
                (attachment) => attachment.file_type === type
              );

              if (attachmentsByType.length === 0) return null; // Skip if no attachments of this type

              return (
                <div key={type} className="mb-4">
                  <h5 className="font-semibold mb-2 capitalize">
                    {type} Compilation
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {attachmentsByType.map((attachment, index) => (
                      <AttachmentCard
                        key={attachment.id}
                        index={index}
                        title={
                          index === 0
                            ? `Initial ${type} ${
                                type === "proposal" ? "Paper" : "Document"
                              } `
                            : status === "pending_review"
                            ? `Pending Revision No. ${index}`
                            : `Revision No. ${index}`
                        }
                        attachment={attachment}
                        setIsUpdated={setIsUpdated}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="h-48 col-span-full flex justify-center items-center">
            <p>No Attachment found.</p>
          </div>
        )}
      </div>

      <Modal
        title="Upload Documents"
        isModalOpen={AttachmentModal}
        setModalOpen={setAttachmentModal}>
        <AddRevisedAttachmentModal
          thesisId={thesisId}
          setIsUpdated={setIsUpdated}
          setIsModalOpen={setAttachmentModal}
        />
      </Modal>
    </div>
  );
};

export default AttachmentCardList;
