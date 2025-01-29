import { requestHandler } from "@/services/RequestServices";
import { AUTH_API } from "@/constants/urls";

const useAuthRequest = () => {
    const registerUser = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: AUTH_API.REGISTER_USER_URL
        })
        return response.json()
    }

    const loginUser = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: AUTH_API.LOGIN_USER_URL
        })
        return response.json()
    }

    return {
        registerUser,
        loginUser
    }
}

export default useAuthRequest;