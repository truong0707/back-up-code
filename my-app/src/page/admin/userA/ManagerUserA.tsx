import React, { Suspense, lazy, useEffect } from "react";
import Styles from "./ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../../store/redux/Store";

const CRUDUser = lazy(() => import("../../../component/admin/CRUDUser"));
const AlertNotificate = lazy(
  () => import("../../../component/alert/AlertNotificate")
);

const ManagerUserA = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const dataUsers = useSelector((state: StateStore) => state.dataUsers); // lấy dữ liệu từ kho redux
  const { /* loading, */ error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();


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
