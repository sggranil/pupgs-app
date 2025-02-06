import { Proposal } from "@/interface/thesis.interface";
import { formatDate } from "@/utilities/DateUtilities";
import useProposalRequest from "@/hooks/proposal";
import { showToast } from "../organisms/Toast";

interface ProposalCardProps {
    index: number;
    title: string;
    proposal: Proposal;
    setIsUpdated: (value: boolean) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ index, title, proposal, setIsUpdated }) => {
    const { deleteProposal } = useProposalRequest();

    async function handleDeleteProposal() {
        setIsUpdated(false);
        try {
            const response = await deleteProposal(Number(proposal.id));
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
        <div className="w-full">
            <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-md font-semibold text-textPrimary">{title}</h2>
                    <p className="text-gray-500 text-sm">{formatDate(proposal.uploaded_at)}</p>
                    <a className="text-blue-500 underline text-sm" href={proposal.file_url} target="_blank" rel="noopener noreferrer">
                        Read Article
                    </a>
                </div>
                {index != 0 &&
                    <button
                        onClick={handleDeleteProposal}
                        className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                    >
                        Delete
                    </button>
                }
            </div>
        </div>
    );
}

export default ProposalCard;