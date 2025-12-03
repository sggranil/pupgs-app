import { requestHandler } from "@/services/RequestServices";
import { THESIS_API } from "@/constants/urls";

const useThesisRequest = () => {
    const getAllThesis = async () => {
        const response = await requestHandler({
            method: 'GET',
            url: THESIS_API.GET_ALL_THESIS_URL
        })
        return response.json()
    }

    const getStudentThesis = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: THESIS_API.GET_STUDENT_THESIS(id)
        })
        return response.json()
    }

    const fetchThesis = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: THESIS_API.FETCH_THESIS_URL(id)
        })
        return response.json()
    }

    const getThesis = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: THESIS_API.GET_THESIS_URL(id)
        })
        return response.json()
    }

    const addThesis = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: THESIS_API.ADD_THESIS_URL
        })
        return response.json()
    }

    const updateThesis = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: THESIS_API.UPDATE_THESIS_URL
        })
        return response.json()
    }

    const updateThesisInfo = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: THESIS_API.UPDATE_THESIS_INFO_URL
        })
        return response.json()
    }

    const confirmedThesis = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: THESIS_API.CONFIRM_THESIS_URL
        })
        return response.json()
    }

    const scheduleThesis = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: THESIS_API.SCHEDULE_THESIS_URL
        })
        return response.json()
    }

    const deleteThesis = async (id: number) => {
        const response = await requestHandler({
            method: 'POST',
            url: THESIS_API.DELETE_THESIS_URL(id)
        })
        return response.json()
    }

    return {
        getAllThesis,
        getStudentThesis,
        fetchThesis,
        getThesis,
        addThesis,
        updateThesis,
        updateThesisInfo,
        confirmedThesis,
        scheduleThesis,
        deleteThesis
    }
}

export default useThesisRequest;
