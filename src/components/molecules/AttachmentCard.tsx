import { Attachment } from "@/interface/thesis.interface";
import { formatDate } from "@/utilities/DateUtilities";
import useProposalRequest from "@/hooks/attachment";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

import { showToast } from "@/components/templates/Toaster";

interface AttachmentCardProps {
  index: number;
  title: string;
  attachment: Attachment;
  setIsUpdated: (value: boolean) => void;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
  index,
  title,
  attachment,
  setIsUpdated,
}) => {
  const userData = getUserInfoFromCookies();

  const { deleteAttachment } = useProposalRequest();

  async function handleDeleteProposal() {
    setIsUpdated(false);
    try {
      const response = await deleteAttachment(Number(attachment.id));
      if (response) {
        showToast("Proposal updated successfully!", "success");
        setIsUpdated(true);
      } else {
        showToast("Unable to delete proposal", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  }

  return (
    <div className="w-full" key={index}>
      <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-md">
        <div>
          <h2 className="text-md font-semibold text-textPrimary capitalize">
            {title}
          </h2>
          <p className="text-gray-500 text-sm">
            {formatDate(attachment.uploaded_at)}
          </p>
          <a
            className="text-blue-500 underline text-sm"
            href={attachment.file_url}
            target="_blank"
            rel="noopener noreferrer">
            Read Article
          </a>
        </div>
        {index != 0 && userData?.role === "student" && (
          <button
            onClick={handleDeleteProposal}
            className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AttachmentCard;
