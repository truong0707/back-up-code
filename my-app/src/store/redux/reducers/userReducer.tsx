import { USER_LOGIN_FAIL, USER_LOGIN_RESQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_RESQUEST, USER_REGISTER_SUCCESS } from "../constants/UserContants";

// Login User
export function userLoginReduder(state = {}, action: { type: string; payload: any; }) {
    switch (action.type) {
        case USER_LOGIN_RESQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: true, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

// Register User
export const userRegisterReducer = (state = {}, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case USER_REGISTER_RESQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: true, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}