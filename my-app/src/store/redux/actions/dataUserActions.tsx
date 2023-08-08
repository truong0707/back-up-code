
import { Dispatch } from "redux";
import { DELETE_USER_FAIL, DELETE_USER_RESQUEST, DELETE_USER_SUCCESS, GET_DATA_USER_FAIL, GET_DATA_USER_RESQUEST, GET_DATA_USER_SUCCESS } from "../constants/dataUserContans";
import axios from "axios";

export function listDataUser() {
    return (
        async (dispatch: Dispatch) => {
            try {
                dispatch({ type: GET_DATA_USER_RESQUEST });
                const { data } = await axios.get(`http://localhost:3000/users`); // call data
                // console.log(data)
                // dispatch({ type: GET_DATA_USER_SUCCESS, payload: data.products }) 
                dispatch({ type: GET_DATA_USER_SUCCESS, payload: data }) // khi mà success thì send data

            } catch (error: any) {
                dispatch({
                    type: GET_DATA_USER_FAIL,
                    payload: error.response.data.message ? error.response.data.message : error.message,
                })
            }
        }
    )
}

/* delete user */
export function deleteDataUser(id: Number) { 
    return (
        async (dispatch: Dispatch) => {
            try {
                dispatch({ type: DELETE_USER_RESQUEST });
                const { data } = await axios.delete(`http://localhost:3000/users/${id}`); // call data
                dispatch({ type: DELETE_USER_SUCCESS, payload: data, });

                // const dataFresh  = await axios.get(`http://localhost:3000/users`);
                // console.log(dataFresh, "âsa")
                // dispatch({ type: GET_DATA_USER_SUCCESS, payload: data });

            } catch (error: any) {
                dispatch({
                    type: DELETE_USER_FAIL,
                    payload: error.response.data.message ? error.response.data.message : error.message,
                })
            }
        }
    )
}

/* update user */
export function updateDataUser(id: Number) { 
    return (
        async (dispatch: Dispatch) => {
            try {
                dispatch({ type: DELETE_USER_RESQUEST });
                const { data } = await axios.put(`http://localhost:3000/users/${id}`); // call data
                dispatch({ type: DELETE_USER_SUCCESS, payload: data, });
            } catch (error: any) {
                dispatch({
                    type: DELETE_USER_FAIL,
                    payload: error.response.data.message ? error.response.data.message : error.message,
                })
            }
        }
    )
}