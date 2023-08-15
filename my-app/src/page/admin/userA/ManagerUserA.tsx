import React, { Suspense, lazy, useEffect } from "react";
import MasterLayoutDoashBoard from "../../../layouts/MasterLayoutDoashBoard";
import Styles from "./ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../../store/redux/Store";
const CRUDUser = lazy(() => import("../../../component/admin/CRUDUser"));

export default function ManagerUserA() {
  const { t } = useTranslation(['homeAdmin']);
  const dataUsers = useSelector((state: StateStore) => state.dataUsers); // lấy dữ liệu từ kho redux
  const { loading, error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();

  /* cate table */
  const titleCateTable = [
    {
      nameCate: "id",
      span: 1,
    },
    {
      nameCate: `${t('admin home.name')} A`,
      span: 6,
    },
    {
      nameCate: `${t('admin home.email')} A`,
      span: 6,
    },
    {
      nameCate: `${t('admin home.phoneNumber')} A`,
      span: 6,
    },
    {
      nameCate: `${t('admin home.option')} A`,
      span: 5,
    },
  ];

  useEffect(() => {
    const productListPromise = listDataUser();
    productListPromise(dispatch);
  }, [dispatch]);

  return (
    <MasterLayoutDoashBoard>
      {loading ? (
        <LoadingCpn/>
      ) : (
        <div className={Styles.WraperCRUDUser}>
          {listDataUsers ? (
            <Suspense fallback={<LoadingCpn />}>
              {/* Tái sử dụng CRUD component */}
              <CRUDUser
                title={`${t('admin home.table_manager_type')} A`}
                data={listDataUsers}
                titleCate={titleCateTable}
                contentBtnAdd={`${t('admin home.add_user_type')} A`}
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
