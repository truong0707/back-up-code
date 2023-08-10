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
  UPDATE_USER_FAIL,
  UPDATE_USER_RESQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants/dataUserContans";
import userServices from "../../../services/user";

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

/* delete user */
export function deleteDataUser(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_USER_RESQUEST });
      const { data } = await userServices.deleteUserApi(id);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });

      /* refresh data */
      const dataRefresh = await userServices.getUserApi();
      dispatch({ type: GET_DATA_USER_RESQUEST });
      dispatch({ type: GET_DATA_USER_SUCCESS, payload: dataRefresh.data });
    } catch (error: any) {
      if (error.message) {
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
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

      /* refresh data */
      const dataRefresh = await userServices.getUserApi();
      dispatch({ type: GET_DATA_USER_RESQUEST });
      dispatch({ type: GET_DATA_USER_SUCCESS, payload: dataRefresh.data });
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
  email: string,
  name: string,
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
      dispatch({ type: ADD_USER_SUCCESS, payload: data });

      /* refresh data */
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
