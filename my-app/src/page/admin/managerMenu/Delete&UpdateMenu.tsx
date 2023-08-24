import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Tree, message } from "antd";
import ModalUpdate from "../../../component/admin/menu/modal/ModalUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../../untils/checkIcons";
import {
  deleteMenuAction,
  getMenuAction,
} from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import {
  DownOutlined,
  ScissorOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import Styles from "./managerMenu.module.scss";
import { useTranslation } from "react-i18next";

export default function DeleteMenu() {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const { menuDetail } = getMenu;
  const dispatch = useDispatch();
  const [idMenu, setIdMenu] = useState<any>();
  const { t } = useTranslation(["homeAdmin"]);

  /* modal update */
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleShowModalUpdate = (id: number | string) => {
    setShowModalUpdate(true);
    setIdMenu(id);
  };

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const handleClickDelete = (id: string | number) => {
    alert("Xóa menu này?");

    if (id === 9) {
      message.error("Menu này e để làm mẫu ạ! - a thử menu khác", 4);
    } else {
      const deleteMenuPromise = deleteMenuAction(id);
      deleteMenuPromise(dispatch);
    }
  };

  const getListDataMenu = listDataMenu.map(
    (data: {
      id: string | number;
      name: string;
      iconClass: string;
      children: [];
    }) => {
      return {
        title: (
          <>
            <Tooltip title={t(`MenuAdmin.delete_menu`)}>
              <DeleteOutlined
                className={Styles.IconDelete}
                onClick={() => handleClickDelete(data.id)}
              />
            </Tooltip>

            <Tooltip title={t(`MenuAdmin.repair_menu`)}>
              <ScissorOutlined
                className={Styles.IconUpdate}
                onClick={() => handleShowModalUpdate(data.id)}
              />
            </Tooltip>

            <b>{data.name}</b>
          </>
        ),
        key: data.id,
        icon: (
          <FontAwesomeIcon
            icon={checkIcons(data.iconClass)}
            style={{ marginRight: "10px" }}
          />
        ),
        children: data.children.length > 0 ? data.children : [],
      };
    }
  );

  return (
    <>
      {getListDataMenu.length === 0 ? (
        <>Chưa có menu nào trong database! - Hãy thêm menu</>
      ) : (
        <>
          <ModalUpdate
            titleModal="Update Menu"
            showMoal={showModalUpdate}
            setShowModalUpdate={setShowModalUpdate}
            idMenu={idMenu}
            menuDetail={menuDetail}
          />

          <Tree
            showIcon
            defaultExpandAll
            defaultSelectedKeys={["0-0-0"]}
            switcherIcon={<DownOutlined />}
            treeData={getListDataMenu}
          />
        </>
      )}
    </>
  );
}
