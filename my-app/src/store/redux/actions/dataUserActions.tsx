import { Dispatch } from "redux";
import {
  ADD_USER_FAIL,
  ADD_USER_RESQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESQUEST,
  DELETE_USER_SUCCESS,
  GET_DATA_USER_FAIL,
  GET_DATA_USER_RESQUEST,
  GET_DATA_USER_SUCCESS,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_RESQUEST,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants/dataUserContans";
import userServices from "../../../services/user";
import { message } from "antd";

export function listDataUser() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_USER_RESQUEST });
      const { data } = await userServices.getUserApi();
      dispatch({ type: GET_DATA_USER_SUCCESS, payload: data });
    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: GET_DATA_USER_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: GET_DATA_USER_FAIL,
          payload: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };
}

export function getDataDetailUser(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_USER_DETAIL_RESQUEST });
      const { data } = await userServices.getUserByIDApi(id);
      dispatch({ type: GET_USER_DETAIL_SUCCESS, payload: data });
    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: GET_USER_DETAIL_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: GET_USER_DETAIL_FAIL,
          payload: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };
}

/* delete user */
export function deleteDataUser(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_USER_RESQUEST });
      const { data } = await userServices.deleteUserApi(id);
      dispatch({ type: DELETE_USER_SUCCESS, payload: { data, id } });
    } catch (error: any) {
      if (error.message) {
        alert("Lỗi server");
        dispatch({
          type: DELETE_USER_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: DELETE_USER_FAIL,
          payload: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };
}

/* update user */
export function updateDataUser(
  id: string,
  email: string,
  name: string,
  numberPhone: string
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_RESQUEST });
      const { data } = await userServices.updateUserApi(
        id,
        name,
        email,
        numberPhone
      );
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          data: {
            id,
            name,
            email,
            numberPhone,
          },
          mesg: data,
        },
      });
      message.success("Cập nhật user thành công!", 3);
    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };
}

/* add data user */
export function addDataUser(
  name: string,
  email: string,
  numberPhone: string,
  password: string
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_USER_RESQUEST });
      const { data } = await userServices.addUserApi(
        name,
        email,
        numberPhone,
        password
      );

      /* Trường hợp 1: khi add user, server trả về thì e sử dụng cách này
      để lấy id
      */
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: {
          data: {
            name: name,
            email: email,
            numberPhone: numberPhone,
            password: password,
          },
          message: data,
        },
      }); // payload ở đây e thấy json server trả về {} nên e truyền vào luôn
      message.success("Thêm user thành công!", 3);

      /* Trường hợp 2 */
      /* Ở đây e nghĩ còn cách gọi lại data vì ko còn cách nào để lấy id của product 
      khi ta tạo mới user, ngoại trừ server trả về user mới vừa tạo (json server
      trả về mảng [])
      */
      const dataRefresh = await userServices.getUserApi();
      dispatch({ type: GET_DATA_USER_RESQUEST });
      dispatch({ type: GET_DATA_USER_SUCCESS, payload: dataRefresh.data });

    } catch (error: any) {
      if (error.message) {
        dispatch({
          type: ADD_USER_FAIL,
          payload: error.message,
        });
      } else {
        dispatch({
          type: ADD_USER_FAIL,
          payload: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };
}
