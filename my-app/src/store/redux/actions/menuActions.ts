import { Dispatch } from "redux";
import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  UPDATE_DATA_MENU,
} from "../constants/menuReducerContans";
import menuServices from "../../../services/menu";
import { message } from "antd";

export function getMenuAction() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_MENU_RESQUEST });
      const { data } = await menuServices.getMenuApi();

      dispatch({ type: GET_DATA_MENU, payload: data });
    } catch (error: any) {
      console.log(error, "err");
    }
  };
}

interface DataMenuOjb {
  name: string;
  url: string;
  iconClass: string;
  children: [];
}

export function addMenuAction(dataOjb: DataMenuOjb) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.postMenuApi(
        dataOjb.name,
        dataOjb.url,
        dataOjb.iconClass,
        dataOjb.children
      );

      dispatch({ type: ADD_DATA_MENU, payload: data });
      message.success("Thêm menu thành công!", 2.5);
    } catch (error: any) {
      message.error("Thêm menu thất bại!", 2.5);
      console.log(error, "Lỗi");
    }
  };
}

export function deleteMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.deleteMenuApi(id);

      dispatch({ type: DELETE_DATA_MENU, payload: id });
      message.success("Xóa menu thành công!", 2.5);
    } catch (error: any) {
      message.error("Lỗi Xóa menu!", 2.5);
      console.log(error, "Lỗi");
    }
  };
}

export function getDetailMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.getMenuByIdApi(id);

      dispatch({ type: GET_DATA_DETAIL_MENU, payload: data });
    } catch (error: any) {
      message.error("get detail thất bại!", 2.5);
      console.log(error, "Lỗi");
    }
  };
}

export function updateMenuAction(id: string | number, dataOjb: DataMenuOjb) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.updateMenuApi(id, dataOjb);

      /* gắn data đã update từ server trả về */
      dispatch({ type: UPDATE_DATA_MENU, payload: data });
      message.success("Cập nhật thành công!", 2.5);
    } catch (error: any) {
      message.error("Cập nhật thất bại!", 2.5);
      console.log(error, "Lỗi");
    }
  };
}