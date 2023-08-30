import { Dispatch } from "redux";
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
      message.success("Thêm menu thành công!", 3);
    } catch (error: any) {
      message.error("Thêm menu thất bại!", 3);
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
    } catch (error: any) {
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
    } catch (error: any) {
      message.error("get detail thất bại!", 3);
      console.log(error, "Lỗi");
    }
  };
}

export function updateMenuAction(id: string | number, dataOjb: DataMenuOjb) {
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
    } catch (error: any) {
      message.error("Cập nhật thất bại!", 3);
      console.log(error, "Lỗi");
    }
  };
}

export function updateFieldMenuAction(
  id: string | number,
  inputData: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await menuServices.updateFieldMenuApi(id, inputData);

      dispatch({ type: UPDATE_FIELD_DATA_MENU, payload: data });
      message.success(`Đã cập nhật sub cho menu có id: ${id} !`, 3);
    } catch (error: any) {
      message.error("Cập nhật thất bại!", 3);
      console.log(error, "Lỗi");
    }
  };
}

// export function getDataSubMenubyIdAction(
//   id: string | number,
// ) {
//   return async (dispatch: Dispatch) => {
//     try {
//       if (id === 9) {
//         message.error("Menu này e làm mẫu ạ!", 3);
//       } else {
//         const { data } = await menuServices.updateFieldMenuApi(id);

//         dispatch({ type: GET_DATA_SUB_MENU, payload: data });
//         message.success(`Đã thêm sub cho menu có id: ${id} !`, 3);
//       }
//     } catch (error: any) {
//       message.error("Cập nhật thất bại!", 3);
//       console.log(error, "Lỗi");
//     }
//   };
// }
