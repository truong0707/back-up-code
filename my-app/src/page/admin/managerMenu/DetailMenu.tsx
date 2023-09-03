import { Alert, Modal, Space, Table, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteMenuAction, getDetailMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../../store/redux/Store";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { childrenData } from "../../../component/tree/TreeMenu";
import BtnShowModalUpdateMenu from "../../../component/admin/menu/BtnShowModalUpdateMenu";
import BtnShowModalAddSubMenu from "../../../component/admin/menu/BtnShowModalAddSubMenu";
import {
  DeleteOutlined,
} from "@ant-design/icons";

interface DataType {
  url: string;
  title: string;
  id: string;
  name: string;
  numberPhone: string;
  tags: string[];
}

export default function DetailMenu() {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail }: any = getMenu;
  const { listDataMenu }: any = getMenu;
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
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


  const columns: ColumnsType<DataType> = [
    {
      title: "Id Sub",
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
        <Link to={`/admin/${record.id}`} key={record.id}>
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
          <BtnShowModalUpdateMenu titleSub={record.title} id={record.id} url={record.url} />
        </Space>
      ),
    },
  ];

  const handleOK = () => {
    const deleteMenuPromise = deleteMenuAction(pathId);
    deleteMenuPromise(dispatch);

    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (pathId) {
      const dataDetailMenuPromise = getDetailMenuAction(pathId);
      dataDetailMenuPromise(dispatch);
    }
  }, [dispatch, pathId]);

  const handleClickDelete = () => {
    setOpen(true);
  };

  return (
    <>
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

      <BtnShowModalAddSubMenu
        parentType={true}
        contenBtn="Thêm mới"
        idMenu={pathId}
        listDataMenu={listDataMenu}
        menuDetail={menuDetail}
      />

      {
        getMenu.loadingDelete ? null : <>
          {getMenu && menuDetail ? (
            <Table columns={columns} dataSource={menuDetail.children} />
          ) : null}
        </>
      }
    </>
  );
}

