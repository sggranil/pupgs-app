export const AUTH_API = {
    REGISTER_USER_URL: "/auth/register",
    REGISTER_ADMIN_URL: (code: string) => `/auth/register/${code}`,
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
    GET_ALL_THESIS_URL: "/thesis/get",
    GET_THESIS_URL: (id: number) => `/thesis/get/${id}`,
    GET_USER_THESIS: (id: number) => `/thesis/user/${id}`,

    FETCH_THESIS_URL: (id: number) => `/thesis/fetch/${id}`,
    ADD_THESIS_URL: "/thesis/add",
    UPDATE_THESIS_URL: "/thesis/update",
    UPDATE_THESIS_INFO_URL: "/thesis/update/info",
    CONFIRM_THESIS_URL: "/thesis/confirmed",
    DELETE_THESIS_URL: (id: number) => `/thesis/delete/${id}`,
}

export const ATTACHMENT_API = {
    GET_ATTACHMENT_URL: (id: number) => `/thesis/attachment/get/${id}`,
    ADD_ATTACHMENT_URL: "/thesis/attachment/add",
    DELETE_ATTACHMENT_URL: (id: number) => `/thesis/attachment/delete/${id}`,
}

export const ROOM_API = {
    GET_ALL_ROOM_URL: "/room/get",
    ADD_ROOM_URL: "/room/add",
    DELETE_ROOM_URL: (id: number) => `/room/delete/${id}`,
    AVAILABLE_ROOM_URL: (date: Date) => `/room/availability/${date}`,
}

export const ADVISER_API = {
    GET_ADVISERS_URL: "/adviser/get"
}

export const UPLOAD_API = {
    UPLOAD_FILE_API: "/file/upload"
}