import { Dispatch } from "redux";
import {
  ADD_DATA_MENU,
  DELETE_DATA_MENU,
  DELETE_SUB_DATA_MENU,
  GET_DATA_DETAIL_MENU,
  GET_DATA_MENU,
  GET_DATA_MENU_RESQUEST,
  UPDATE_DATA_MENU,
  UPDATE_FIELD_DATA_MENU,
} from "../constants/menuContans";
import menuServices from "../../../services/menu";
import { message } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";

export function getMenuAction() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_DATA_MENU_RESQUEST });
      const { data } = await menuServices.getMenuApi();

      dispatch({ type: GET_DATA_MENU, payload: data });
    } catch (error: AxiosError | any) {
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
      message.success("Thêm menu thành công!", 3);
    } catch (error: AxiosError | any) {
      message.error("Thêm menu thất bại! - kiểm tra server ", 3);
      console.log(error, "Lỗi");
    }
  };
}

export function deleteMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = await menuServices.deleteMenuApi(id);

      dispatch({ type: DELETE_DATA_MENU, payload: id });
      message.success("Xóa menu thành công!", 2.5);
    } catch (error: AxiosError | any) {
      message.error("Lỗi Xóa menu! - xem log ở tab", 2.5);
      console.log(error, "Lỗi");
    }
  };
}

export function getDetailMenuAction(id: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.getMenuByIdApi(id);

      dispatch({ type: GET_DATA_DETAIL_MENU, payload: data });
    } catch (error: AxiosError | any) {
      message.error("get detail thất bại! - kiểm tra server", 3);
      console.log(error, "Lỗi");
    }
  };
}

/* update menu */
export function updateMenuAction(
  id: string | number,
  dataOjb: { name: string; url: string; iconClass: string }
) {
  return async (dispatch: Dispatch) => {
    try {
      if (id === 9) {
        message.error("Menu này e làm mẫu ạ!", 3);
      } else {
        const { data } = await menuServices.updateMenuApi(id, dataOjb);

        /* gắn data đã update từ server trả về */
        dispatch({ type: UPDATE_DATA_MENU, payload: data });
        message.success("Cập nhật thành công!", 3);
      }
    } catch (error: AxiosError | any) {
      message.error("Cập nhật thất bại!", 3);
      console.log(error, "Lỗi");
    }
  };
}

export function updateFieldMenuAction(id: string | number, inputData: {}) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.updateFieldMenuApi(id, inputData);

      dispatch({ type: UPDATE_FIELD_DATA_MENU, payload: data });
      message.success(`Đã cập nhật sub cho menu có id cha: ${id} !`, 3);
    } catch (error: AxiosError | any) {
      message.error("Cập nhật thất bại! - có lỗi ở server", 5);
      console.log(error, "Lỗi");
    }
  };
}

export function deleteSubdMenuAction(id: string | number, inputData: {}) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.updateFieldMenuApi(id, inputData);

      dispatch({
        type: DELETE_SUB_DATA_MENU,
        payload: { data: data, idMenu: id },
      });
      message.success(`Xoá sub cho menu có id cha là: ${id} thành công !`, 3);
    } catch (error: AxiosError | any) {
      message.error("Xoá sub menu thất bại! - có lỗi ở server", 5);
      console.log(error, "Lỗi");
    }
  };
}

export function addSubMenuAction(id: string | number, dataInput: {}) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.addSubMenuApi(id, dataInput);

      dispatch({ type: UPDATE_FIELD_DATA_MENU, payload: data });
      message.success(`Đã thêm sub cho menu có id cha là: ${id} !`, 3);
    } catch (error: AxiosError | any) {
      message.error("Thêm sub menu thất bại! - có lỗi Server", 5);
      console.log(error, "Lỗi");
    }
  };
}
