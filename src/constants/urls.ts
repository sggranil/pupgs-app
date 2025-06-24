export const AUTH_API = {
    REGISTER_USER_URL: "/auth/register",
    LOGIN_USER_URL: "/auth/login",
};

export const USER_API = {
    GET_USER_URL: (id: number) => `/user/get/${id}`,
    GET_ALL_USER_URL: "/user/get",
    UPDATE_USER_URL: "/user/update",
}

export const SUBJECT_API = {
    GET_ALL_SUBJECT_URL: "/subject/get",
    GET_SUBJECT_URL: (id: number) => `/subject/get/${id}`,
    ADD_SUBJECT_URL: "/subject/add",
    UPDATE_SUBJECT_URL: "/subject/update",
    CONFIRMED_SUBJECT_URL: "/subject/confirmed",
    DELETE_SUBJECT_URL: (id: number) => `/subject/delete/${id}`,
}

export const THESIS_API = {
    FETCH_THESIS_URL: (id: number) => `/thesis/fetch/${id}`,
    GET_ALL_THESIS_URL: "/thesis/get",
    GET_THESIS_URL: (id: number) => `/thesis/get/${id}`,
    ADD_THESIS_URL: "/thesis/add",
    UPDATE_THESIS_URL: "/thesis/update",
    UPDATE_THESIS_INFO_URL: "/thesis/update/info",
    CONFIRM_THESIS_URL: "/thesis/confirmed",
    SCHEDULE_THESIS_URL: "/thesis/update/schedule",
    DELETE_THESIS_URL: (id: number) => `/thesis/delete/${id}`,
}

export const PROPOSAL_API = {
    GET_PROPOSAL_URL: (id: number) => `/thesis/proposal/get/${id}`,
    ADD_PROPOSAL_URL: "/thesis/proposal/add",
    DELETE_PROPOSAL_URL: (id: number) => `/thesis/proposal/delete/${id}`,
}

export const ROOM_API = {
    GET_ALL_ROOM_URL: "/room/get",
    ADD_ROOM_URL: "/room/add",
    DELETE_ROOM_URL: (id: number) => `/room/delete/${id}`,
    AVAILABLE_ROOM_URL: (id: number, date: string) => `/room/availability/${id}/${date}`,
}

export const ADVISER_API = {
    GET_ADVISERS_URL: "/adviser/get"
}

export const UPLOAD_API = {
    UPLOAD_FILE_API: "/file/upload"
}