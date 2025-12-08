"use client";

import { useGetAttachment } from "@/hooks/attachment";
import { Attachment } from "@/interface/thesis.interface";

import AttachmentCard from "@/components/molecules/AttachmentCard";

import Modal from "@/components/organisms/Modal";
import ManageAttachmentModal from "@/components/organisms/Modals/ManageAttachmentModal";
import AttachmentCardSkeleton from "@/components/molecules/Skeleton/AttachmentCarSkeleton";

interface AttachmentCardList {
  thesisId: number;
  status: string;
}

const AttachmentCardList: React.FC<AttachmentCardList> = ({
  thesisId,
  status,
}) => {

  const {
    data: attachmentData,
    isLoading: isAttachmentLoading,
    error,
    refetch
  } = useGetAttachment(thesisId);

  const handleAttachmentUpdated = () => {
    refetch();
  };

  // const isOverallLoading = isUserContextLoading || isThesisLoading;
  const listData = (attachmentData?.data || [] as Attachment[]);
  // const [userAttachment, setUserAttachment] = useState<Attachment[] | null>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [AttachmentModal, setAttachmentModal] = useState<boolean>(false);
  // const [isUpdated, setIsUpdated] = useState<boolean>(false);

  // const userData = getUserInfoFromCookies();

  // const { getAttachment } = useAttachmentRequest();

  // const fetchAttachment = async () => {
  //   setLoading(true);
  //   const response = await getAttachment(Number(thesisId));
  //   if (response) {
  //     setUserAttachment(response?.data);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchAttachment();
  // }, [isUpdated]);

  return (
    <>
      <div className="py-2">
        {isAttachmentLoading ? (
          <AttachmentCardSkeleton />
        ) : listData && listData.length > 0 ? (
          ["proposal", "urec", "twd", "grammarian", "statistician"].map(
            (type) => {
              const attachmentsByType = listData.filter(
                (attachment: any) => attachment.file_type === type
              );

              if (attachmentsByType.length === 0) return null; // Skip if no attachments of this type

              return (
                <div key={type} className="mb-4">
                  {/* <h5 className="font-semibold mb-2 capitalize">
                    {type} Compilation
                  </h5> */}
                  <div className="grid grid-cols-2 gap-2">
                    {attachmentsByType.map((attachment: any, index: any) => (
                      <AttachmentCard
                        key={attachment.id}
                        index={index}
                        title={
                          index === 0
                            ? `Initial ${type} ${type === "proposal" ? "Paper" : "Document"
                            } `
                            : status === "pending_review"
                              ? `Pending Revision No. ${index}`
                              : `Revision No. ${index}`
                        }
                        attachment={attachment}
                        setIsUpdated={handleAttachmentUpdated}
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

      {/* <Modal
        title="Upload Documents"
        isModalOpen={AttachmentModal}
        setModalOpen={setAttachmentModal}>
        <ManageAttachmentModal
          thesisId={thesisId}
          setIsUpdated={setIsUpdated}
          setIsModalOpen={setAttachmentModal}
        />
      </Modal> */}
    </>
  );
};

export default AttachmentCardList;
