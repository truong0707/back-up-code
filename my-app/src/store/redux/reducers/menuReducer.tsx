import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  DELETE_SUB_DATA_MENU,
  DELETE_SUB_DATA_MENU_RESQUEST,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  GET_DATA_SUB_MENU,
  UPDATE_DATA_MENU,
  UPDATE_FIELD_DATA_MENU,
} from "../constants/menuContans";

interface MyMenuState {
  menuDetail: {};
  listDataMenu: [];
}

export const menuReducer = (
  state: MyMenuState = {
    listDataMenu: [],
    menuDetail: [],
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
      const currentData = [...state.listDataMenu];
      const newDataUpate = action.payload;
      const as = currentData.map((menu: {
        id: number,
        name: string,
        iconClass: string,
        children: []
      }) => {
        if (menu.id === newDataUpate.id) {
          return {
            id: newDataUpate.id,
            name: newDataUpate.name,
            iconClass: newDataUpate.iconClass,
            children: newDataUpate.children,
          };
        }
        return menu;
      });
      return { ...state, listDataMenu: as, menuDetail: action.payload };
    case DELETE_DATA_MENU:
      const dataCurrentMenuList = [...state.listDataMenu];

      function xoaMenuTheoID(arr: any, idCanXoa: string | number) {
        return arr.filter((item: any) => {
          if (item.id === idCanXoa) {
            return false;
          }

          if (item.children && item.children.length > 0) {
            item.children = xoaMenuTheoID(item.children, idCanXoa);
          }

          return true;
        });
      }
      const newListMenu = xoaMenuTheoID(dataCurrentMenuList, action.payload);
      return {
        ...state,
        listDataMenu: newListMenu
      }
    case ADD_DATA_MENU:
      const currentlistDataMenu: {}[] = [...state.listDataMenu];
      const payload = action.payload;
      currentlistDataMenu.push(payload);
      return { ...state, listDataMenu: currentlistDataMenu };
    case DELETE_SUB_DATA_MENU_RESQUEST:
      return { ...state, loadingDelete: true };
    case DELETE_SUB_DATA_MENU:
      const currentlistData = [...state.listDataMenu];
      const menuDetailCurrent = state.menuDetail;
      const currentlistMenuDetail = [menuDetailCurrent];
      const newData = action.payload.data;
      const findData = currentlistData.map((menu: { id: number, name: string, iconClass: string, children: [] }) => {
        if (menu.id === newData.id) {
          console.log(menu, "menu")
          return {
            id: newData.id,
            name: newData.name,
            iconClass: newData.iconClass,
            children: newData.children,
          };
        } 


        return menu;
      });

      console.log(currentlistMenuDetail, "currentlistMenuDetail")
      console.log(newData, "newData");
      console.log(findData, "findData")

      return {
        ...state,
        listDataMenu: findData,
        menuDetail: newData,
        loadingDelete: false,
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
    case GET_DATA_SUB_MENU:
      return {
        ...state,
        listSubDataMenu: action.payload,
      };
    default:
      return state;
  }
};
