import { requestHandler } from "@/services/RequestServices";
import { ATTACHMENT_API } from "@/constants/urls";

const useAttachmentRequest = () => {
    const getAttachment = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: ATTACHMENT_API.GET_ATTACHMENT_URL(id)
        })
        return response.json()
    }

    const addAttachment = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: ATTACHMENT_API.ADD_ATTACHMENT_URL
        })
        return response.json()
    }

    const deleteAttachment = async (id: number) => {
        const response = await requestHandler({
            method: 'POST',
            url: ATTACHMENT_API.DELETE_ATTACHMENT_URL(id)
        })
        return response.json()
    }

    return {
        getAttachment,
        addAttachment,
        deleteAttachment
    }
}

export default useAttachmentRequest;
