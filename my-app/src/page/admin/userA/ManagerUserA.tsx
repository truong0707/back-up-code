import React, { Suspense, lazy, useEffect } from "react";
import MasterLayoutDoashBoard from "../../../layouts/MasterLayoutDoashBoard";
import Styles from "./ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
const CRUDUser = lazy(() => import("../../../component/admin/CRUDUser"));

export default function ManagerUserA() {
  const titleCateTable = [
    {
      nameCate: "id",
      span: 1,
    },
    {
      nameCate: "Tên",
      span: 6,
    },
    {
      nameCate: "Email",
      span: 6,
    },
    {
      nameCate: "Sô điện thoại",
      span: 6,
    },
    {
      nameCate: "Tùy chọn",
      span: 5,
    },
  ];

  const dataUsers = useSelector((state: any) => state.dataUsers); // lấy dữ liệu từ kho redux
  const { loading, error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();

  useEffect(() => {
    const productListPromise = listDataUser();
    productListPromise(dispatch);
  }, [dispatch]);

  return (
    <MasterLayoutDoashBoard>
      {loading ? (
        "loading.."
      ) : (
        <div className={Styles.WraperCRUDUser}>
          {listDataUsers ? (
            <Suspense fallback={<LoadingCpn />}>
              {/* Tái sử dụng CRUD component */}
              <CRUDUser
                title={"Bảng quản lý A"}
                data={listDataUsers}
                titleCate={titleCateTable}
                contentBtnAdd={"Thêm người dùng loại A"}
              />
            </Suspense>
          ) : (
            <>{error}</>
          )}
        </div>
      )}
    </MasterLayoutDoashBoard>
  );
}
