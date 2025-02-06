export const AUTH_API = {
    REGISTER_USER_URL: "/auth/register",
    LOGIN_USER_URL: "/auth/login",
};

export const USER_API = {
    GET_USER_URL: (id: number) => `/user/get/${id}`,
    UPDATE_USER_URL: "/user/update",
}

export const SUBJECT_API = {
    GET_SUBJECT_URL: (id: number) => `/subject/get/${id}`,
    ADD_SUBJECT_URL: "/subject/add",
    UPDATE_SUBJECT_URL: "/subject/update",
    DELETE_SUBJECT_URL: (id: number) => `/subject/delete/${id}`,
}

export const THESIS_API = {
    GET_THESIS_URL: (id: number) => `/thesis/get/${id}`,
    ADD_THESIS_URL: "/thesis/add",
    UPDATE_THESIS_URL: "/thesis/update",
    DELETE_THESIS_URL: (id: number) => `/thesis/delete/${id}`,
}

export const UPLOAD_API = {
    UPLOAD_FILE_API: "/file/upload"
}