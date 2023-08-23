import React, { Suspense, lazy, useEffect } from "react";
import { Divider, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../spin/LoadingCpn";
import { StateStore } from "../../store/redux/Store";
import AlertNotificate from "../alert/AlertNotificate";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { getMenuAction } from "../../store/redux/actions/menuActions";

const ModalBtnAdd = lazy(() => import("./ModalBtnAdd"));
const ModalBtnDelete = lazy(() => import("./ModalBtnDelete"));
const ModalBtnUpdate = lazy(() => import("./ModalBtnUpdate"));

interface MyCRUDUserProps {
  title: String;
  data: [];
  contentBtnAdd?: string;
}

interface DataType {
  email: string;
  id: string;
  name: string;
  numberPhone: string;
  tags: string[];
}

const CRUDUser = (props: MyCRUDUserProps) => {
  const dataUsers = useSelector((state: StateStore) => state.dataUsers); // get data store
  const { msgDeleteError } = dataUsers;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  },[dispatch]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.name`)}`,
      dataIndex: "name",
      key: "name",
      // render: (text) => <Link >{text}</Link>,
      render: (_, record) => (
        <Link to={`/admin/user-detail/${record.id}`} key={record.id}>
          {record.name}
        </Link>
      ),
    },
    {
      title: `${t(`adminHome.email`)}`,
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t(`adminHome.phoneNumber`)}`,
      dataIndex: "numberPhone",
      key: "numberPhone",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.option`)}`,
      key: "action",
      render: (_, record) => (
        <Space align="center" key={record.id} size="middle">
          <ModalBtnDelete id={record.id} email={record.email} />
          <ModalBtnUpdate idUser={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <Space style={{ padding: "10px" }}>
          <ModalBtnAdd contentBtnAdd={props.contentBtnAdd} />
        </Space>
        <Divider orientation="left">{props.title}</Divider>
        <div style={{ width: "99%" }}>
          {msgDeleteError ? (
            <>
              <AlertNotificate msg={"Lỗi server"} type={"error"} />
            </>
          ) : null}
        </div>
        <Table columns={columns} dataSource={props.data} />
      </Suspense>
    </>
  );
};
export default CRUDUser;
