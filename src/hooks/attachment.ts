import { useQuery, useMutation } from '@tanstack/react-query';
import { ATTACHMENT_API } from "@/constants/urls";

import { handleGetRequest, handlePostRequest } from "@/hooks/request"; 
import { ResponsePayloadResult } from '@/interface/request.interface';
import { Attachment } from '@/interface/thesis.interface';

const ATTACHMENT_KEYS = {
    all: ['attachment'] as const,
    lists: () => [...ATTACHMENT_KEYS.all, 'list'] as const,
    detail: (id: number) => [...ATTACHMENT_KEYS.all, 'detail', id] as const,
    user: (id: number) => [...ATTACHMENT_KEYS.all, 'user', id] as const,
};

export const useGetAttachment = (id: number | undefined | null) => {
    const isEnabled = !!id;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: ATTACHMENT_KEYS.detail(id as number),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(ATTACHMENT_API.GET_ATTACHMENT_URL(id as number)),
        enabled: isEnabled,
    });
};

export const useAddAttachment = () => {
    return useMutation<Attachment, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Attachment>(ATTACHMENT_API.ADD_ATTACHMENT_URL, body),
    });
};

const AttachmentService = {
    useGetAttachment,
    useAddAttachment
}

export default AttachmentService;


// const useAttachmentRequest = () => {
//     const getAttachment = async (id: number) => {
//         const response = await requestHandler({
//             method: 'GET',
//             url: ATTACHMENT_API.GET_ATTACHMENT_URL(id)
//         })
//         return response.json()
//     }

//     const addAttachment = async (body: object) => {
//         const response = await requestHandler({
//             method: 'POST',
//             body: JSON.stringify(body),
//             url: ATTACHMENT_API.ADD_ATTACHMENT_URL
//         })
//         return response.json()
//     }

//     const deleteAttachment = async (id: number) => {
//         const response = await requestHandler({
//             method: 'POST',
//             url: ATTACHMENT_API.DELETE_ATTACHMENT_URL(id)
//         })
//         return response.json()
//     }

//     return {
//         getAttachment,
//         addAttachment,
//         deleteAttachment
//     }
// }

// export default useAttachmentRequest;
