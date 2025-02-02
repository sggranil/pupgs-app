import { requestHandler } from "@/services/RequestServices";
import { USER_API } from "@/constants/urls";

const useUserRequest = () => {
    const getUser = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: USER_API.GET_USER_URL(id)
        })
        return response.json()
    }

    const updateUser = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: USER_API.UPDATE_USER_URL
        })
        return response.json()
    }

    return {
        getUser,
        updateUser
    }
}

export default useUserRequest;