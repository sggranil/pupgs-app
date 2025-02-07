import { requestHandler } from "@/services/RequestServices";
import { ADVISER_API } from "@/constants/urls";

const useAdviserRequest = () => {
    const getAllAdviser = async () => {
        const response = await requestHandler({
            method: 'GET',
            url: ADVISER_API.GET_ADVISERS_URL
        })
        return response.json()
    }

    return {
        getAllAdviser,
    }
}

export default useAdviserRequest;