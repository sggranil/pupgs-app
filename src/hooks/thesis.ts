import { useQuery, useMutation } from '@tanstack/react-query';
import { THESIS_API } from "@/constants/urls";
import { Thesis } from "@/interface/thesis.interface";

import { handleGetRequest, handlePostRequest } from "@/hooks/request";
import { ResponsePayloadResult } from '@/interface/request.interface';

const THESIS_KEYS = {
    all: ['thesis'] as const,
    lists: () => [...THESIS_KEYS.all, 'list'] as const,
    detail: (id: number) => [...THESIS_KEYS.all, 'detail', id] as const,
    user: (id: number) => [...THESIS_KEYS.all, 'user', id] as const,
};

export const useAllThesis = () => {
    return useQuery<Thesis[], Error>({
        queryKey: THESIS_KEYS.lists(),
        queryFn: () => handleGetRequest<Thesis[]>(THESIS_API.GET_ALL_THESIS_URL),
    });
};

export const useUserThesis = (userId: number | undefined | null) => {
    const isEnabled = !!userId;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: THESIS_KEYS.user(userId as number),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(THESIS_API.GET_USER_THESIS(userId as number)),
        enabled: isEnabled,
    });
};

export const useFetchThesis = (id: number | undefined | null) => {
    const isEnabled = !!id;

    return useQuery<Thesis, Error>({
        queryKey: THESIS_KEYS.detail(id as number),
        queryFn: () => handleGetRequest<Thesis>(THESIS_API.FETCH_THESIS_URL(id as number)),
        enabled: isEnabled,
    });
};

export const useGetThesis = (id: number | undefined | null) => {
    const isEnabled = !!id;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: THESIS_KEYS.detail(id as number),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(THESIS_API.GET_THESIS_URL(id as number)),
        enabled: isEnabled,
    });
};


export const useAddThesis = () => {
    return useMutation<Thesis, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Thesis>(THESIS_API.ADD_THESIS_URL, body),
    });
};

export const useUpdateThesis = () => {
    return useMutation<Thesis, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Thesis>(THESIS_API.UPDATE_THESIS_URL, body),
    });
};

export const useConfirmedThesis = () => {
    return useMutation<Thesis, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Thesis>(THESIS_API.CONFIRM_THESIS_URL, body),
    });
};

export const useDeleteThesis = () => {
    return useMutation<{ message: string }, Error, number>({
        mutationFn: (id: number) => handlePostRequest<{ message: string }>(THESIS_API.DELETE_THESIS_URL(id)),
    });
};

const ThesisService = {
    useAllThesis,
    useUserThesis,
    useFetchThesis,
    useGetThesis,
    useAddThesis,
    useUpdateThesis,
    useConfirmedThesis,
    useDeleteThesis
}

export default ThesisService;