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

/* Get data users */
export function listDataUserReducer(
  state = { dataUsers: [] },
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case GET_DATA_USER_RESQUEST:
      return { loading: true, listDataUsers: [] };
    case GET_DATA_USER_SUCCESS:
      return { ...state, loading: false, listDataUsers: action.payload };
    case GET_DATA_USER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_USER_RESQUEST:
      return { ...state };
    case DELETE_USER_SUCCESS:
      return { ...state, msgDeleteSuccess: "Xóa thành công" };
    case DELETE_USER_FAIL:
      return { ...state, msgUpdateError: action.payload };
    case UPDATE_USER_RESQUEST:
      return { ...state };
    case UPDATE_USER_SUCCESS:
      return { ...state, msgUpdateSuccess: true };
    case UPDATE_USER_FAIL:
      return { ...state, msgUpdateError: action.payload };
    case ADD_USER_RESQUEST:
      return { ...state, msgAddSuccess: true };
    case ADD_USER_SUCCESS:
      return { ...state, msgAddSuccess: true };
    case ADD_USER_FAIL:
      return { loading: false, msgAddError: action.payload, msgAddSuccess: false };
    default:
      return state;
  }
}