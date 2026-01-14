import { useQuery } from '@tanstack/react-query';
import { ADVISER_API } from "@/constants/urls";

import { handleGetRequest } from "@/hooks/request";
import { ResponsePayloadResult } from '@/interface/request.interface';

const ADVISER_KEYS = {
    all: ['adviser'] as const,
    lists: () => [...ADVISER_KEYS.all, 'list'] as const,
    detail: (date: Date) => [...ADVISER_KEYS.all, 'detail', date] as const,
    user: (id: number) => [...ADVISER_KEYS.all, 'user', id] as const,
};

export const useAllAdvisers = () => {
    return useQuery<ResponsePayloadResult, Error>({
        queryKey: ADVISER_KEYS.lists(),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(ADVISER_API.GET_ADVISERS_URL),
    });
};

const AdviserService = {
    useAllAdvisers,
}

export default AdviserService;