import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import menuServices from "../../../services/menu";
import { Link, useLocation } from "react-router-dom";
import { getDetailMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../../store/redux/Store";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import ModalBtnUpdate from "../../../component/admin/ModalBtnUpdate";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import BtnShowModalAddMenuSub from "../../../component/admin/BtnShowModalAddMenuSub";

interface DataType {
  title: string;
  id: string;
  name: string;
  numberPhone: string;
  tags: string[];
}

export default function DetailMenu() {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail }: any = getMenu;
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const { t } = useTranslation(["homeAdmin"]);

  useEffect(() => {
    // if (pathId) {
    //   const dataDetailMenuPromise = getDetailMenuAction(pathId);
    //   dataDetailMenuPromise(dispatch);
    // }

    if (pathId) {
      const dataDetailMenuPromise = getDetailMenuAction(pathId);
      dataDetailMenuPromise(dispatch);
    }

    // const getData = async () => {
    //   if (pathId) {
    //     const { data } = await menuServices.getMenuByIdApi(pathId);

    //     if (data) {
    //       setData(data.children);
    //     }
    //   }
    // };
    // getData();
  }, [dispatch, pathId]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id Sub",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.name`)} Sub`,
      dataIndex: "name",
      key: "name",
      // render: (text) => <Link >{text}</Link>,
      render: (_, record) => (
        <Link to={`/admin/user-detail/${record.id}`} key={record.id}>
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
          <ModalBtnDelete
            typeDelete="subMenu"
            contentBtn="xóa"
            id={record.id}
            nameOjbDelete={record.title}
          />
          {/* <ModalBtnUpdate idUser={record.id} /> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <BtnShowModalAddMenuSub id={pathId} />

      {/* {data ? <Table columns={columns} dataSource={data} /> : null} */}
      {getMenu && menuDetail ? (
        <Table columns={columns} dataSource={menuDetail.children} />
      ) : null}
    </>
  );
}
