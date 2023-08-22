import { Dispatch } from "redux";
import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
} from "../constants/menuReducerContans";
import menuServices from "../../../services/menu";

export function getMenuAction() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_MENU_RESQUEST });
      const { data } = await menuServices.getMenuApi();

      console.log(data, "data");

      dispatch({ type: GET_DATA_MENU, payload: data });
    } catch (error: any) {
      console.log(error, "err");
      // if (error.message) {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.message,
      //   });
      // } else {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      //   });
      // }
    }
  };
}

export function addMenuAction(
  dataOjb: any /* idMenu: number, nameMenu: string, urlMenu: string, iconClass: string, children: [] */
) {
  return async (dispatch: Dispatch) => {
    try {
      console.log(dataOjb, "ojb");
      // dispatch({ type: ADD_DATA_MENU });
      const { data } = await menuServices.postMenuApi(
        dataOjb.name,
        dataOjb.url,
        dataOjb.iconClass,
        dataOjb.children
      );

      dispatch({ type: ADD_DATA_MENU, payload: data });
      console.log(data, "data post");
    } catch (error: any) {
      // if (error.message) {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.message,
      //   });
      // } else {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      //   });
      // }
    }
  };
}

export function deleteMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.deleteMenuApi(id);
      dispatch({ type: DELETE_DATA_MENU, payload: id });

    } catch (error: any) {
      // if (error.message) {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.message,
      //   });
      // } else {
      //   dispatch({
      //     type: GET_DATA_USER_FAIL,
      //     payload: error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      //   });
      // }
    }
  };
}

export function getDetailMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.getMenuByIdApi(id);


      // console.log(data, "alo")

      dispatch({ type: GET_DATA_DETAIL_MENU, payload: data });

    } catch (error: any) {
    
    }
  };
}
