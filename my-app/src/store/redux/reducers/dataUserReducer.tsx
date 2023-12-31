import { UserType } from "../../../types/User";
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

interface MyState {
  listDataUsers: [];
}

/* Get data users */
export function listDataUserReducer(
  state: MyState = {
    listDataUsers: [],
  },
  action: { type: string; payload: any }
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
      return {
        ...state,
        msgDeleteSuccess: "Xóa thành công",
        listDataUsers: state.listDataUsers.filter(
          (user: { id: string }) => user.id !== action.payload.id
        ),
      };
    case DELETE_USER_FAIL:
      return { ...state, msgUpdateError: action.payload };
    case UPDATE_USER_RESQUEST:
      return { ...state };
    case UPDATE_USER_SUCCESS:
      const currentListDataUsersUp = [...state.listDataUsers];
      const payloadDataUpdate = action.payload.data;
      return {
        ...state,
        msgUpdateSuccess: true,
        listDataUsers: currentListDataUsersUp.map((user: UserType) => {
          if (`${user.id}` === payloadDataUpdate.id) {
            return {
              name: payloadDataUpdate.name,
              email: payloadDataUpdate.email,
              numberPhone: payloadDataUpdate.numberPhone,
              id: payloadDataUpdate.id,
            };
          }
          return user;
        }),
      };
    case UPDATE_USER_FAIL:
      return { ...state, msgUpdateError: action.payload };
    case GET_USER_DETAIL_RESQUEST:
      return { ...state };
    case GET_USER_DETAIL_SUCCESS:
      return { ...state, dataUserDetail: action.payload };
    case GET_USER_DETAIL_FAIL:
      return { ...state };
    case ADD_USER_RESQUEST:
      return { ...state, msgAddSuccess: true };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        msgAddSuccess: true,
      };
    case ADD_USER_FAIL:
      return {
        loading: false,
        msgAddError: action.payload,
        msgAddSuccess: false,
      };
    default:
      return state;
  }
}
