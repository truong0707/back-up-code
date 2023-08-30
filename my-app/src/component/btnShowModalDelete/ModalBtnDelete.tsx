import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../store/redux/Store";
import menuServices from "../../services/menu";
import { useLocation } from "react-router-dom";

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
  const { t } = useTranslation(["homeAdmin"]);

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
      const removeItemById = (menuData: any, targetId: string | number) => {
        const updatedMenuData = menuData.filter((item:any) => item.id !== targetId);

        updatedMenuData.forEach((item:any) => {
          if (item.children && item.children.length > 0) {
            item.children = removeItemById(item.children, targetId);
          }
        });

        return updatedMenuData;
      };

      const newSubmenu = removeItemById(menuDetail.children, props.id);

      if (menuDetail && menuDetail.children) {
        menuServices.updateFieldMenuApi(pathId, {
          //   id: 1,
          //   name: "Menu 2 4",
          //   url: "/menu1",
          //   iconClass: "folder-open",
          children: newSubmenu,
        });
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
        {props.contentBtn}
      </Button>

      <Modal
        title={t("adminHome.delete_user")}
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>
          {/* {t(`adminHome.want_delete_user`)} */}
          Có chắc muốn xóa {props.id}{" "}
          <b>{/* props.email */ props.nameOjbDelete}</b>?
        </p>
      </Modal>
    </>
  );
};

export default ModalBtn;
