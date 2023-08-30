import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  GET_DATA_SUB_MENU,
  UPDATE_DATA_MENU,
  UPDATE_FIELD_DATA_MENU,
} from "../constants/menuContans";

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
      return { ...state, menuDetail: action.payload };
    case UPDATE_FIELD_DATA_MENU:
      return { ...state, menuDetail: action.payload };
    case ADD_DATA_MENU:
      const currentlistDataMenu: {}[] = [...state.listDataMenu];
      const payload = action.payload;
      currentlistDataMenu.push(payload);
      return { ...state, listDataMenu: currentlistDataMenu };
    case DELETE_DATA_MENU:
      return {
        ...state,
        listDataMenu: state.listDataMenu.filter(
          (menu: { id: string }) => menu.id !== action.payload
        ),
      };
    case UPDATE_DATA_MENU:
      const currentListDataMenusUp = [...state.listDataMenu];
      const payloadDataUpdate = action.payload;
      return {
        ...state,
        listDataMenu: currentListDataMenusUp.map(
          (items: {
            id: string | number;
            name: string;
            url: string;
            iconClass: string;
            children: [];
          }) => {
            if (items.id === payloadDataUpdate.id) {
              return {
                id: payloadDataUpdate.id,
                name: payloadDataUpdate.name,
                url: payloadDataUpdate.url,
                iconClass: payloadDataUpdate.iconClass,
                children: payloadDataUpdate.children,
              };
            }
            return items;
          }
        ),
      };
    case UPDATE_FIELD_DATA_MENU:
      return {
        ...state,
        menuDetail: action.payload,
      };
    case GET_DATA_SUB_MENU:
      return {
        ...state,
        listSubDataMenu: action.payload,
      };
    default:
      return state;
  }
};
