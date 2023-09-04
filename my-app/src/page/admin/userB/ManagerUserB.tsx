import React, { Suspense, lazy, useEffect } from "react";
import Styles from "../userA/ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../../store/redux/Store";
import { Space } from "antd";
import ModalBtnDelete from "../../../component/btnShowModalDelete/ModalBtnDelete";
import ModalBtnUpdate from "../../../component/admin/user/ModalBtnUpdate";
import { Link } from "react-router-dom";
import { ColumnsType } from "rc-table/lib/interface";

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

const ManagerUserB = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const dataUsers = useSelector((state: StateStore) => state.dataUsers); // lấy dữ liệu từ kho redux
  const { /* loading, */ error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();

  useEffect(() => {
    const productListPromise = listDataUser();
    productListPromise(dispatch);
  }, [dispatch]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id B",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.name`)} B`,
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
      title: `${t(`adminHome.email`)} B`,
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t(`adminHome.phoneNumber`)} B`,
      dataIndex: "numberPhone",
      key: "numberPhone",
      render: (text) => <p>{text}</p>,
    },
    {
      title: `${t(`adminHome.option`)} B`,
      key: "action",
      render: (_, record) => (
        <Space align="center" key={record.id} size="middle">
          <ModalBtnDelete
            typeDelete="user"
            id={record.id}
            nameOjbDelete={record.email}
            contentBtn="xóa"
          />
          <ModalBtnUpdate idUser={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <div className={Styles.WraperCRUDUser}>
          {listDataUsers ? (
            <CRUDUser
              title={`${t("adminHome.table_manager_type")} B`}
              data={listDataUsers}
              contentBtnAdd={`${t("adminHome.add_user_type")} B`}
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
export default ManagerUserB;
