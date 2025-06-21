import { requestHandler } from "@/services/RequestServices";
import { ROOM_API } from "@/constants/urls";

const useRoomRequest = () => {
    const getAllRooms = async () => {
        const response = await requestHandler({
            method: 'GET',
            url: ROOM_API.GET_ALL_ROOM_URL
        })
        return response.json()
    }

    const addRoom = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: ROOM_API.ADD_ROOM_URL
        })
        return response.json()
    }

    const deleteRoom = async (id: number) => {
        const response = await requestHandler({
            method: 'POST',
            url: ROOM_API.DELETE_ROOM_URL(id)
        })
        return response.json()
    }

    return {
        getAllRooms,
        addRoom,
        deleteRoom
    }
}

export default useRoomRequest;