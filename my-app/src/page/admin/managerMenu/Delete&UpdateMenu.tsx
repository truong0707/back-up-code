import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, Tooltip, Tree, message } from "antd";
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
import ModalUpdateMenu from "../../../component/admin/menu/ModalUpdateMenu";

const DeleteMenu = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const [open, setOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [id, setId] = useState<number | string>();

  /* modal update */
  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);

  }, [dispatch]);

  const handleClickDelete = (id: string | number) => {
    setId(id)
    setOpen(true);
  };

  const handleClickUpdate = (id: string | number) => {
    setOpenModalUpdate(true);
  }

  const handleOK = () => {
    if (id) {
      const deleteMenuPromise = deleteMenuAction(id);
      deleteMenuPromise(dispatch);
    }
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
    setOpenModalUpdate(false);
  }

  const getListDataMenu = listDataMenu.map(
    (data: {
      id: string | number,
      name: string,
      url: string,
      iconClass: string,
      children: [],
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
              <ScissorOutlined onClick={() => handleClickUpdate(data.id)} className={Styles.IconUpdate} />
            </Tooltip>

            <ModalUpdateMenu handleOK={handleOK} openModalUpdate={openModalUpdate} handleCancel={handleCancel} setOpenModalUpdate={setOpenModalUpdate} idMenu={data.id} nameMenu={data.name} urlMenu={data.url} iconClass={data.iconClass} />

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
      <Modal
        title="Title"
        open={open}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Alert
          message="Bạn có chắc muốn xoá menu này? Toàn bộ sub menu của menu này cũng sẽ mất!"
          type="warning"
          showIcon
        />
      </Modal>


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
