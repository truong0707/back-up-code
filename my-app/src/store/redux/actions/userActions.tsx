import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESQUEST,
  USER_REGISTER_SUCCESS,
  UserDispatchTypes,
} from "../constants/UserContants";
import { Dispatch } from "redux";
import userServices from "../../../services/user";

/* Login */
export function login(email: string, password: string) {
  return async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const { data } = await userServices.userLoginApi(email, password)

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      /// save localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
}

// logout
export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
  alert("bye user");
};

// register
export const register =
  (
    name: string,
    email: string,
    password: string,
    confirmPass: string,
    numberPhone: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_RESQUEST }); 
      const { data } = await userServices.userRegisterApi(name, email, password, confirmPass, numberPhone)
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      /// save localStorage
      document.location.href = "/admin";
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert(
        "Chào mừng bạn đã đến với trang web của tôi, để chỉnh sửa profile, bạn click vào avata hoặc tên của minh !"
      );
    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
