import { Alert, Modal, Space, Table } from "antd";
import React, { Children, Suspense, lazy, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteMenuAction,
  getDetailMenuAction,
} from "../../../store/redux/actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../../store/redux/Store";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { childrenData } from "../../../component/tree/TreeMenu";
import LoadingCpn from "../../../component/spin/LoadingCpn";
const BtnShowModalAddSubMenu = lazy(
  () => import("../../../component/admin/menu/BtnShowModalAddSubMenu")
);
const BtnShowModalUpdateMenu = lazy(
  () => import("../../../component/admin/menu/BtnShowModalUpdateSubMenu")
);

interface DataType {
  url: string;
  title: string;
  id: string;
  // name: string;
  // numberPhone: string;
  // tags: string[];
  children: any[];
  key: number;
}

const DetailMenu = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail }: any = getMenu;
  const { listDataMenu }: any = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showChildtreeMenu = (children: childrenData[] | undefined): {}[] => {
    if (!children || children.length === 0) {
      return [];
    }

    return children.map((childMenu: childrenData) => {
      // if (childMenu.id === 44) {
      //   return {
      //     id: "55",
      //     title: "Da sua",
      //     url: "/menu1/subA",
      //     children: [],
      //   };
      // }

      return {
        title: childMenu.title,
        id: childMenu.id,
        children: showChildtreeMenu(childMenu.children),
        url: childMenu.url,
      };
    });
  };

  const handleOK = () => {
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

  const columns: ColumnsType<DataType> = [
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
      // render: (text) => <Link >{text}</Link>,
      render: (_, record) => (
        <Link to={`/admin/${record.url}`} key={record.id}>
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
          <BtnShowModalAddSubMenu
            idMenu={pathId}
            idSubMenu={record.id}
            listDataMenu={listDataMenu}
            menuDetail={menuDetail}
          />

          <ModalBtnDelete
            typeDelete="subMenu"
            contentBtn="xóa"
            id={record.id}
            nameOjbDelete={record.title}
          />
          <BtnShowModalUpdateMenu
            titleSub={record.title}
            id={record.id}
            url={record.url}
          />
        </Space>
      ),
    },
  ];

  const handleData = (menu: []) => {
    if (menu) {
      const data = menu.map((dataMenu: { id: string; children: [] }): any => {
        return {
          ...dataMenu,
          key: dataMenu.id,
          children: handleData(dataMenu.children),
        };
      });

      return data
    }

    return undefined;
  };

  return (
    <Suspense fallback={<LoadingCpn />}>
      <Modal title="Title" open={open} onOk={handleOK} onCancel={handleCancel}>
        <Alert
          message="Bạn có chắc muốn xoá menu này? Toàn bộ sub menu của menu này cũng sẽ mất!"
          type="warning"
          showIcon
        />
      </Modal>

      <BtnShowModalAddSubMenu
        parentType={true}
        contenBtn="Thêm mới"
        idMenu={pathId}
        listDataMenu={listDataMenu}
        menuDetail={menuDetail}
      />

      {getMenu && menuDetail ? (
        <Table
          columns={columns}
          dataSource={
            // menuDetail.children
            // data
            handleData(menuDetail.children)
          }
        />
      ) : null}
    </Suspense>
  );
};

export default DetailMenu;
