import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  UPDATE_DATA_MENU,
} from "../constants/menuReducerContans";

interface MyMenuState {
    listDataMenu: [];
}

export const menuReducer = (
  state: MyMenuState = {
    listDataMenu: [],
  },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case GET_DATA_MENU_RESQUEST:
      return { listDataMenu: [] };
    case GET_DATA_MENU:
      return { listDataMenu: action.payload };
    case ADD_DATA_MENU:
      return { ...state };
    // case DELETE_DATA_MENU:
    //   return;
    // case UPDATE_DATA_MENU:
    //   return;
    default:
      return state;
  }
};
