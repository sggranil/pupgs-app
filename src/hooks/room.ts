import { useQuery, useMutation } from '@tanstack/react-query';
import { ROOM_API } from "@/constants/urls";

import { handleGetRequest, handlePostRequest } from "@/hooks/request";
import { ResponsePayloadResult } from '@/interface/request.interface';
import { Room } from '@/interface/thesis.interface';

const ROOM_KEYS = {
    all: ['room'] as const,
    lists: () => [...ROOM_KEYS.all, 'list'] as const,
    detail: (date: Date) => [...ROOM_KEYS.all, 'detail', date] as const,
    user: (id: number) => [...ROOM_KEYS.all, 'user', id] as const,
};

export const useAllRooms = () => {
    return useQuery<Room[], Error>({
        queryKey: ROOM_KEYS.lists(),
        queryFn: () => handleGetRequest<Room[]>(ROOM_API.GET_ALL_ROOM_URL),
    });
};

export const useAvailableRooms = (date: Date | undefined | null) => {
    const isEnabled = !!date;

    return useQuery<ResponsePayloadResult, Error>({
        queryKey: ROOM_KEYS.detail(date as Date),
        queryFn: () => handleGetRequest<ResponsePayloadResult>(ROOM_API.AVAILABLE_ROOM_URL(date as Date)),
        enabled: isEnabled,
    });
};

export const useAddRoom = () => {
    return useMutation<Room, Error, object>({
        mutationFn: (body: any) => handlePostRequest<Room>(ROOM_API.ADD_ROOM_URL, body),
    });
};

export const useDeleteRoom = () => {
    return useMutation<{ message: string }, Error, number>({
        mutationFn: (id: number) => handlePostRequest<{ message: string }>(ROOM_API.DELETE_ROOM_URL(id)),
    });
};

const RoomService = {
    useAllRooms,
    useAvailableRooms,
    useAddRoom,
    useDeleteRoom
}

export default RoomService;