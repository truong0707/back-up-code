import { Dispatch } from "redux";
import {
  ADD_DATA_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
} from "../constants/menuReducerContans";
import menuServices from "../../../services/menu";

export function getMenuAction() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_MENU_RESQUEST });
      const { data } = await menuServices.getMenuApi();

      dispatch({ type: GET_DATA_MENU, payload: data });
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

export function addMenuAction(ojb: any /* idMenu: number, nameMenu: string, urlMenu: string, iconClass: string, children: [] */) {
  return async (dispatch: Dispatch) => {
    try {
      console.log(ojb, "ojb")
      // dispatch({ type: ADD_DATA_MENU });
      // const { data } = await menuServices.postMenuApi(idMenu, nameMenu, urlMenu, iconClass, children);

      // // dispatch({ type: GET_DATA_MENU, payload: data });
      // console.log(data, "data post")
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
