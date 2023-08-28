import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Tree, message } from "antd";
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
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { Link } from "react-router-dom";

const DeleteMenu = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  /* modal update */
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
              <Link to={`/admin/update/${data.id}`}>
                <ScissorOutlined className={Styles.IconUpdate} />
              </Link>
            </Tooltip>

            <b>{data.name}</b>
          </>
        ),
        key: data.id,
        icon: (
          <FontAwesomeIcon
            icon={checkIcons(data.iconClass)}
            className={Styles.icon}
          />
        ),
        children: data.children.length > 0 ? data.children : [],
      };
    }
  );

  return (
    <Suspense fallback={<LoadingCpn />}>
      {getListDataMenu.length === 0 ? (
        <>Chưa có menu nào trong database! - Hãy thêm menu</>
      ) : (
        <>
          <Tree
            showIcon
            defaultExpandAll
            defaultSelectedKeys={["0-0-0"]}
            switcherIcon={<DownOutlined />}
            treeData={getListDataMenu}
          />
        </>
      )}
    </Suspense>
  );
};

export default DeleteMenu;
