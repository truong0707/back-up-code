import React, { Suspense, lazy, useEffect } from "react";
import Styles from "./ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../../store/redux/Store";
import { ColumnsType } from "rc-table/lib/interface";
import { Link } from "react-router-dom";
import { Space } from "antd";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import ModalBtnUpdate from "../../../component/admin/user/ModalBtnUpdate";

const CRUDUser = lazy(() => import("../../../component/admin/user/CRUDUser"));
const AlertNotificate = lazy(
  () => import("../../../component/alert/AlertNotificate")
);

interface DataType {
  email: string;
  id: string;
  name: string;
  numberPhone: string;
  tags: string[];
}

const ManagerUserA = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const { error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: "Id A",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.name`)} A`,
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
      title: `${t(`adminHome.email`)} A`,
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t(`adminHome.phoneNumber`)} A`,
      dataIndex: "numberPhone",
      key: "numberPhone",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.option`)} A`,
      key: "action",
      render: (_, record) => (
        <Space align="center" key={record.id} size="middle">
          <ModalBtnDelete
            typeDelete="user"
            contentBtn="xóa"
            id={record.id}
            nameOjbDelete={record.email}
          />
          <ModalBtnUpdate idUser={record.id} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const productListPromise = listDataUser();
    productListPromise(dispatch);
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <div className={Styles.WraperCRUDUser}>
          {listDataUsers ? (
            <CRUDUser
              title={`${t("adminHome.table_manager_type")} A`}
              data={listDataUsers}
              contentBtnAdd={`${t("adminHome.add_user_type")} A`}
              columnsTitle={columns}
            />
          ) : (
            <AlertNotificate msg={`${error}`} type={"error"} />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default ManagerUserA;
