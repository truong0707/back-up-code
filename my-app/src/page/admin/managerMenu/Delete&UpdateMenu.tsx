import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, Tooltip, Tree } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../../untils/checkIcons";
import Styles from "./managerMenu.module.scss";
import { useTranslation } from "react-i18next";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import _ from "underscore";
import { typeMenuHaveId } from "../../../types/Menu";
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
import ModalCRUDMenu from "../../../component/admin/menu/ModalCRUDMenu";

const DeleteMenu = () => {
  const getMenu = useSelector(
    (state: StateStore) => state.MenuAdmin,
    _.isEqual
  );
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const [open, setOpen] = useState(false);
  const [openModalUpdateMenu, setOpenModalUpdateMenu] = useState(false);
  const [id, setId] = useState<number | string>();
  const [dataUpdateCurrent, setDataUpdateCurrent] = useState<any>();

  /* modal update */
  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const handleClickDelete = (id: string | number) => {
    setId(id);
    setOpen(true);
  };

  const handleClickUpdate = (data: object) => {
    setDataUpdateCurrent(data);
    console.log(dataUpdateCurrent, "dataUpdateCurrent");
    setOpenModalUpdateMenu(true);
  };

  const handleOK = () => {
    if (id) {
      const deleteMenuPromise = deleteMenuAction(id);
      deleteMenuPromise(dispatch);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getListDataMenu = listDataMenu.map((data: typeMenuHaveId) => {
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
              onClick={() =>
                handleClickUpdate({
                  id: data.id,
                  name: data.name,
                  iconClass: data.iconClass,
                  url: data.url,
                })
              }
              className={Styles.IconUpdate}
            />
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
  });

  return (
    <Suspense fallback={<LoadingCpn />}>
      <Modal title="Title" open={open} onOk={handleOK} onCancel={handleCancel}>
        <Alert
          message="Bạn có chắc muốn xoá menu này? Toàn bộ sub menu của menu này cũng sẽ mất!"
          type="warning"
          showIcon
        />
      </Modal>

      {openModalUpdateMenu && dataUpdateCurrent ? (
        <ModalCRUDMenu
          openModalUpdateMenu={openModalUpdateMenu}
          setOpenModalUpdateMenu={setOpenModalUpdateMenu}
          titleModal={"update menu"}
          typeModal={"update-menu"}
          listDataMenu={[]}
          idMenu={dataUpdateCurrent.id}
          namedefault={dataUpdateCurrent.name}
          urlDefault={dataUpdateCurrent.url}
          iconDefault={dataUpdateCurrent.iconClass}
        />
      ) : null}

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
