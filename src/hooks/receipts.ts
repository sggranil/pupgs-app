import { useQuery, useMutation } from '@tanstack/react-query';
import { RECEIPTS_API, THESIS_API } from "@/constants/urls";
import { Thesis, ThesisReceipt } from "@/interface/thesis.interface";

import { handleGetRequest, handlePostRequest } from "@/hooks/request";
import { ResponsePayloadResult } from '@/interface/request.interface';

const RECEIPTS_KEYS = {
    all: ['receipts'] as const,
    lists: () => [...RECEIPTS_KEYS.all, 'list'] as const,
    detail: (id: number) => [...RECEIPTS_KEYS.all, 'detail', id] as const,
    user: (id: number) => [...RECEIPTS_KEYS.all, 'user', id] as const,
};

export const useAllReceipts = () => {
    return useQuery<ResponsePayloadResult, Error>({
        queryKey: RECEIPTS_KEYS.lists(),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(RECEIPTS_API.GET_ALL_RECEIPTS_URL),
    });
};

export const useGetReceipt = (id: number | undefined | null) => {
    const isEnabled = !!id;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: RECEIPTS_KEYS.detail(id as number),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(RECEIPTS_API.GET_RECEIPTS_URL(id as number)),
        enabled: isEnabled,
    });
};

export const useAddReceipt = () => {
    return useMutation<Thesis, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Thesis>(RECEIPTS_API.ADD_RECEIPTS_URL, body),
    });
};

export const useUpdateReceipt = () => {
    return useMutation<ThesisReceipt, Error, object>({
        mutationFn: (body: any) => handlePostRequest<ThesisReceipt>(RECEIPTS_API.UPDATE_RECEIPTS_URL, body),
    });
};

export const useDeleteReceipt = () => {
    return useMutation<{ message: string }, Error, number>({
        mutationFn: (id: number) => handlePostRequest<{ message: string }>(RECEIPTS_API.DELETE_RECEIPTS_URL(id)),
    });
};

const ReceiptService = {
    useAllReceipts,
    useGetReceipt,
    useAddReceipt,
    useUpdateReceipt,
    useDeleteReceipt
}

export default ReceiptService;