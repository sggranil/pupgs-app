import { requestHandler } from "@/services/RequestServices";
import { PROPOSAL_API } from "@/constants/urls";

const useProposalRequest = () => {
    const getProposal= async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: PROPOSAL_API.GET_PROPOSAL_URL(id)
        })
        return response.json()
    }

    const addProposal = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: PROPOSAL_API.ADD_PROPOSAL_URL
        })
        return response.json()
    }

    const deleteProposal = async (id: number) => {
        const response = await requestHandler({
            method: 'POST',
            url: PROPOSAL_API.DELETE_PROPOSAL_URL(id)
        })
        return response.json()
    }

    return {
        getProposal,
        addProposal,
        deleteProposal
    }
}

export default useProposalRequest;
