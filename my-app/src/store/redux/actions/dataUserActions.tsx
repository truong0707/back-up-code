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
import axios from "axios";

export function listDataUser() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_USER_RESQUEST });
      const { data } = await axios.get(`http://localhost:3000/users`); // call data
      dispatch({ type: GET_DATA_USER_SUCCESS, payload: data }); // khi mà success thì send data
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
export function deleteDataUser(id: Number) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_USER_RESQUEST });
      const { data } = await axios.delete(`http://localhost:3000/users/${id}`); // call data
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
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
  id: String,
  email: string,
  name: string,
  numberPhone: string
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_RESQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/users/${id}`,
        { name, email, numberPhone },
        config
      ); // call data
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/users`,
        { name, email, numberPhone, password },
        config
      ); // call data
      dispatch({ type: ADD_USER_SUCCESS, payload: data });
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
