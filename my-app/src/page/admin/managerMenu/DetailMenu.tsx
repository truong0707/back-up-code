import { Alert, Button, Modal, Space, Table } from "antd";
import React, { lazy, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../../store/redux/Store";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { childrenData } from "../../../component/tree/TreeMenu";
import {
  DataTypecolumnsMenu,
  TypeSubMenuDontChilden,
  typeMenuHaveId,
} from "../../../types/Menu";
import { PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteMenuAction,
  getDetailMenuAction,
} from "../../../store/redux/actions/menuActions";
import ModalAddUpdateSubMenu from "../../../component/admin/menu/ModalAddAndUpdateSubMenu";

const DetailMenu = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail }: any = getMenu;
  const { listDataMenu }: any = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const [open, setOpen] = useState(false);
  const [openModalUpdateSubMenu, setopenModalUpdateSubMenu] = useState(false);
  const [openModalAddSubMenu, setopenModalAddSubMenu] = useState(false);
  const [dataUpdateCurrent, setDataUpdateCurrent] = useState<any>();
  const [dataAddCurrent, setDataAddCurrent] = useState<any>();
  const [typeParent, setTypeParent] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showChildtreeMenu = (children: childrenData[] | undefined): {}[] => {
    if (!children || children.length === 0) {
      return [];
    }

    return children.map((childMenu: childrenData) => {
      return {
        title: childMenu.title,
        id: childMenu.id,
        children: showChildtreeMenu(childMenu.children),
        url: childMenu.url,
      };
    });
  };

  const handleOKDelete = () => {
    const deleteMenuPromise = deleteMenuAction(pathId);
    deleteMenuPromise(dispatch);

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (pathId) {
      const dataDetailMenuPromise = getDetailMenuAction(pathId);
      dataDetailMenuPromise(dispatch);
    }
  }, [dispatch, pathId]);

  const handleClickUpdate = (data: TypeSubMenuDontChilden) => {
    setDataUpdateCurrent(data);
    setopenModalUpdateSubMenu(true);
  };

  const handleClickAdd = (data: {
    idMenu: string;
    idSubMenu: string;
    listDataMenu: [];
    menuDetail: {};
  }) => {
    setDataAddCurrent(data);
    setopenModalAddSubMenu(true);
  };

  const handleOpenAddSubMenuFirst = (data: {
    idMenu: string;
    parentType: boolean;
    listDataMenu: [];
    menuDetail: {};
  }) => {
    setDataAddCurrent(data);
    setTypeParent(false);
    setopenModalAddSubMenu(true);
  };

  const columns: ColumnsType<DataTypecolumnsMenu> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{/* {text} */}</p>,
    },
    {
      title: `${t(`adminHome.name`)} Sub`,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Link to={`/admin${record.url}`} key={record.id}>
          {record.title}
        </Link>
      ),
    },
    {
      title: `url`,
      dataIndex: "url",
      key: "url",
    },
    {
      title: `Thao tác`,
      key: "action",
      render: (_, record) => (
        <Space align="center" key={record.id} size="middle">
          <Button
            onClick={() =>
              handleClickAdd({
                idMenu: pathId,
                idSubMenu: record.id,
                listDataMenu: listDataMenu,
                menuDetail: menuDetail,
              })
            }
            type="primary"
            htmlType="submit"
          >
            <PlusOutlined />
          </Button>

          <ModalBtnDelete
            typeDelete="subMenu"
            contentBtn="xóa"
            id={record.id}
            nameOjbDelete={record.title}
          />

          <Button
            onClick={() =>
              handleClickUpdate({
                title: record.title,
                idSubMenu: record.id,
                urlSubMenu: record.url,
                listDataMenu: listDataMenu,
              })
            }
            type="primary"
            htmlType="submit"
          >
            <FontAwesomeIcon icon={"pen-to-square"} />
          </Button>
        </Space>
      ),
    },
  ];

  const handleData = (menu: []) => {
    if (menu) {
      const data = menu.map((dataMenu: typeMenuHaveId): any => {
        return {
          ...dataMenu,
          key: dataMenu.id,
          children: handleData(dataMenu.children),
        };
      });
      return data;
    }
    return undefined;
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOKDelete}
        onCancel={handleCancel}
      >
        <Alert
          message="Bạn có chắc muốn xoá menu này? Toàn bộ sub menu của menu này cũng sẽ mất!"
          type="warning"
          showIcon
        />
      </Modal>

      <Button
        onClick={() =>
          handleOpenAddSubMenuFirst({
            idMenu: pathId,
            parentType: true,
            listDataMenu: listDataMenu,
            menuDetail: menuDetail,
          })
        }
        type="primary"
        htmlType="submit"
      >
        Thêm mới
      </Button>

      {/* if Update  */}
      {openModalUpdateSubMenu ? (
        <ModalAddUpdateSubMenu
          idMenu={pathId}
          listDataMenu={dataUpdateCurrent.listDataMenu}
          idSubMenu={dataUpdateCurrent.idSubMenu}
          openModalUpdateSubMenu={openModalUpdateSubMenu}
          setopenModalUpdateSubMenu={setopenModalUpdateSubMenu}
          titleSub={dataUpdateCurrent.title}
          urlSubMenu={dataUpdateCurrent.urlSubMenu}
          typeForm={"update"}
        />
      ) : null}

      {/* if Add  */}
      {openModalAddSubMenu && typeParent ? (
        <ModalAddUpdateSubMenu
          parentType={typeParent}
          setTypeParent={setTypeParent}
          idMenu={dataAddCurrent.pathId}
          listDataMenu={dataAddCurrent.listDataMenu}
          menuDetail={dataAddCurrent.menuDetail}
          setopenModalAddSubMenu={setopenModalAddSubMenu}
          openModalAddSubMenu={openModalAddSubMenu}
          typeForm={"add"}
        />
      ) : null}

      {openModalAddSubMenu ? (
        <ModalAddUpdateSubMenu
          typeForm={"add"}
          openModalAddSubMenu={openModalAddSubMenu}
          setopenModalAddSubMenu={setopenModalAddSubMenu}
          idMenu={pathId}
          listDataMenu={dataAddCurrent.listDataMenu}
          menuDetail={dataAddCurrent.menuDetail}
          idSubMenu={dataAddCurrent.idSubMenu}
        />
      ) : null}

      {getMenu && menuDetail ? (
        <Table columns={columns} dataSource={handleData(menuDetail.children)} />
      ) : null}
    </>
  );
};

export default DetailMenu;
