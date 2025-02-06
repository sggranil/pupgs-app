import { requestHandler } from "@/services/RequestServices";
import { SUBJECT_API } from "@/constants/urls";

const useSubjectRequest = () => {
    const getAllSubject = async () => {
        const response = await requestHandler({
            method: 'GET',
            url: SUBJECT_API.GET_ALL_SUBJECT_URL
        })
        return response.json()
    }
    
    const getSubject = async (id: number) => {
        const response = await requestHandler({
            method: 'GET',
            url: SUBJECT_API.GET_SUBJECT_URL(id)
        })
        return response.json()
    }

    const addSubject = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: SUBJECT_API.ADD_SUBJECT_URL
        })
        return response.json()
    }

    const updateSubject = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: SUBJECT_API.UPDATE_SUBJECT_URL
        })
        return response.json()
    }

    const confirmedSubject = async (body: object) => {
        const response = await requestHandler({
            method: 'POST',
            body: JSON.stringify(body),
            url: SUBJECT_API.CONFIRMED_SUBJECT_URL
        })
        return response.json()
    }

    const deleteSubject = async (id: number) => {
        const response = await requestHandler({
            method: 'POST',
            url: SUBJECT_API.DELETE_SUBJECT_URL(id)
        })
        return response.json()
    }

    return {
        getSubject,
        addSubject,
        updateSubject,
        deleteSubject,
        confirmedSubject,
        getAllSubject
    }
}

export default useSubjectRequest;