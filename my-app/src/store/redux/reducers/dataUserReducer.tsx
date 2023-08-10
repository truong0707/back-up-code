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
    // case DELETE_USER_RESQUEST:
    //   return { ...state };
    // case DELETE_USER_SUCCESS:
    //   return { ...state };
    // case DELETE_USER_FAIL:
    //   return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// /* delete data users */
export function deleteUserReducer(
  state = {},
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case DELETE_USER_RESQUEST:
      return { loading: true , msg: action.payload };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

/* update data users */
export function updateUserReducer(
  state = {},
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case UPDATE_USER_RESQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: true, msg: action.payload };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

/* add data users */
export function addDataUserReducer(
  state = {},
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case ADD_USER_RESQUEST:
      return { loading: true };
    case ADD_USER_SUCCESS:
      return { ...state, loading: true, msg: action.payload };
    case ADD_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
