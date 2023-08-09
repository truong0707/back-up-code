import Doashboard from "../../../layouts/MasterLayoutDoashBoard";
import React, { Suspense, lazy, useEffect } from "react";
import MasterLayoutDoashBoard from "../../../layouts/MasterLayoutDoashBoard";
import Styles from "../userA/ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
const CRUDUser = lazy(() => import("../../../component/admin/CRUDUser"));

export default function ManagerUserB() {
  const titleCateTable = [
    {
      nameCate: "id B",
      span: 1,
    },
    {
      nameCate: "Tên B",
      span: 6,
    },
    {
      nameCate: "Email B",
      span: 6,
    },
    {
      nameCate: "Sô điện thoại B",
      span: 6,
    },
    {
      nameCate: "Tùy chọn B",
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
                title={"Bảng quản lý B"}
                data={listDataUsers}
                titleCate={titleCateTable}
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
