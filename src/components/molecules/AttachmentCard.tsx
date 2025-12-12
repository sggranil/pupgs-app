import { Attachment } from "@/interface/thesis.interface";
import { formatDate } from "@/utilities/DateUtilities";
import { useDeleteAttachment } from "@/hooks/attachment";

import { showToast } from "@/components/template/Toaster";
import Link from "next/link";
import { UserData } from "@/interface/user.interface";

interface AttachmentCardProps {
  user: UserData | null;
  index: number;
  title?: string;
  attachment: Attachment;
  file_type: string;
  setIsUpdated: (value: boolean) => void;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
  user,
  index,
  title,
  attachment,
  file_type,
  setIsUpdated,
}) => {
  const { mutateAsync: deleteAttachment } = useDeleteAttachment();

  async function handleDeleteProposal(id: number) {
    try {
      deleteAttachment(id, {
        onSuccess: () => {
          setIsUpdated(true);
          showToast(
            `You deleted an attachment.`,
            "success",
            "Attachment Deleted"
          );
        },
        onError: (error) => {
          showToast(error.message, "error");
        },
      });
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  }

  return (
    <div
      className="w-[250] flex-shrink-0 md:flex-shrink md:w-full ring-1 ring-black ring-opacity-10 transition-opacity rounded-sm"
      key={index}>
      <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md">
        <div>
          <h2 className="text-sm font-semibold text-content-primary capitalize">
            {title}
          </h2>
          <p className="text-content-secondary text-xs">
            {formatDate(attachment.created_at)}
          </p>
          <Link
            className="text-green-600 underline text-xs"
            href={attachment.file_url}
            target="_blank"
            rel="noopener noreferrer">
            Open
          </Link>
          {index >= 0 &&
            !title?.includes("Initial") &&
            user?.role === "student" && (
              <button
                onClick={() => handleDeleteProposal(attachment.id)}
                className="ml-2 text-red-500 underline text-xs">
                Delete
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentCard;
