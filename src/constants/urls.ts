export const AUTH_API = {
    REGISTER_USER_URL: "/auth/register",
    LOGIN_USER_URL: "/auth/login",
};

export const USER_API = {
    GET_USER_URL: (id: number) => `/user/get/${id}`,
    UPDATE_USER_URL: "/user/update",
}