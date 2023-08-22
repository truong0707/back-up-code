import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  GET_DATA_DETAIL_MENU,
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
    case GET_DATA_DETAIL_MENU:
      return {...state, menuDetail: action.payload };
    case ADD_DATA_MENU:
      const currentlistDataMenu: any = [...state.listDataMenu];
      const payload = action.payload;
      currentlistDataMenu.push(payload);

      return { ...state, listDataMenu: currentlistDataMenu };
    case DELETE_DATA_MENU:
      return {
        ...state,
        listDataMenu: state.listDataMenu.filter(
          (user: { id: string }) => user.id !== action.payload
        ),
      };
    // case UPDATE_DATA_MENU:
    //   return;
    default:
      return state;
  }
};
