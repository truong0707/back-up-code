import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { useLocation } from "react-router-dom";
import { deleteSubdMenuAction } from "../../store/redux/actions/menuActions";
import { DeleteOutlined } from "@ant-design/icons";

interface MyModalBtn {
  id: string;
  // email?: string;
  nameOjbDelete: string;
  contentBtn: string;
  typeDelete: string;
}

const ModalBtn = (props: MyModalBtn) => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail }: any = getMenu;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  /* Handle delete */
  const handleDelete = () => {
    setIsModalOpen(false);

    if (props.typeDelete === "user") {
      /* Delete dành cho user */
      const deleteUserPromise = deleteDataUser(props.id);
      deleteUserPromise(dispatch);
    } else if (props.typeDelete === "subMenu") {
      /* Delete sub menu */
      const removeItemById = (menuData: [], targetId: string | number) => {
        const updatedMenuData = menuData.filter(
          (item: { id: string }) => item.id !== targetId
        );

        updatedMenuData.forEach((item: any) => {
          if (item.children && item.children.length > 0) {
            item.children = removeItemById(item.children, targetId);
          }
        });

        return updatedMenuData;
      };

      const newSubmenu = removeItemById(menuDetail.children, props.id);
      console.log(newSubmenu, "áda");

      if (menuDetail && menuDetail.children) {
        const DeleteSubMenuActionPromise = deleteSubdMenuAction(
          pathId,
          {
            //   id: 1,
            //   name: "Menu 2 4",
            //   url: "/menu1",
            //   iconClass: "folder-open",
            children: newSubmenu,
          }
          // listDataMenu
        );
        DeleteSubMenuActionPromise(dispatch);
      }
    } else {
      alert("sss");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" danger onClick={showModal}>
        <DeleteOutlined />
      </Button>

      <Modal
        title="Thông báo"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>
          {/* {t(`adminHome.want_delete_user`)} */}
          Có chắc bạn muốn xóa <b>{props.nameOjbDelete}</b> không?
        </p>
      </Modal>
    </>
  );
};

export default ModalBtn;
