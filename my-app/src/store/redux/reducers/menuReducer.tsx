import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  DELETE_SUB_DATA_MENU,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  GET_DATA_SUB_MENU,
  UPDATE_DATA_MENU,
  UPDATE_FIELD_DATA_MENU,
} from "../constants/menuContans";

interface MyMenuState {
  menuDetail: any;
  listDataMenu: [];
}

export const menuReducer = (
  state: MyMenuState = {
    listDataMenu: [],
    menuDetail: undefined,
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
    case DELETE_SUB_DATA_MENU:
      const currentlistData: {}[] = [...state.listDataMenu];
      const currentlistMenuDetail: { children: any }[] = [state.menuDetail];
      const newData = action.payload.data;
      const id = parseInt(action.payload.id);

      const abc = currentlistData.map((menu: any) => {
        if (menu.id === newData.id) {
          return {
            id: newData.id,
            name: newData.name,
            iconClass: newData.iconClass,
            children: newData.children,
          };
        }
        return menu;
      });

      const cbs = state.listDataMenu.filter((menu: { id: number }) => {
        if (menu.id === id) {
          return menu;
        }
      });

      console.log(cbs, "abc");
      console.log(currentlistMenuDetail[0], "currentlistMenuDetail");

      // console.log(cbs, "no day");
      // console.log(cbs, "no day");

      return {
        ...state,
        listDataMenu: abc,
        menuDetail: currentlistMenuDetail[0],
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
    // case UPDATE_FIELD_DATA_MENU:
    //   return {
    //     ...state,
    //     menuDetail: action.payload,
    //   };
    case GET_DATA_SUB_MENU:
      return {
        ...state,
        listSubDataMenu: action.payload,
      };
    default:
      return state;
  }
};
