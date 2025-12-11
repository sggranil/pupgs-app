import { useQuery, useMutation } from '@tanstack/react-query';
import { USER_API } from "@/constants/urls";

import { handleGetRequest, handlePostRequest } from "@/hooks/request";
import { ResponsePayloadResult } from '@/interface/request.interface';
import { User } from '@/interface/user.interface';

const USER_KEYS = {
    all: ['thesis'] as const,
    lists: () => [...USER_KEYS.all, 'list'] as const,
    detail: (id: number) => [...USER_KEYS.all, 'detail', id] as const,
    user: (id: number) => [...USER_KEYS.all, 'user', id] as const,
};

export const useAllUsers = () => {
    return useQuery<User[], Error>({
        queryKey: USER_KEYS.lists(),
        queryFn: () => handleGetRequest<User[]>(USER_API.GET_ALL_USER_URL),
    });
};

export const useGetUser = (id: number | undefined | null) => {
    const isEnabled = !!id;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: USER_KEYS.detail(id as number),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(USER_API.GET_USER_URL(id as number)),
        enabled: isEnabled,
    });
};

export const useUpdateUser = () => {
    return useMutation<User, Error, object>({
        mutationFn: (body: any) => handlePostRequest<User>(USER_API.UPDATE_USER_URL, body),
    });
};

const UserService = {
    useAllUsers,
    useGetUser,
    useUpdateUser
}

export default UserService;