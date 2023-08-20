import React, { Suspense, lazy, useEffect } from "react";
import Styles from "../userA/ManagerUserA.module.scss";
import { listDataUser } from "../../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { useTranslation } from "react-i18next";
import { StateStore } from "../../../store/redux/Store";

const CRUDUser = lazy(() => import("../../../component/admin/CRUDUser"));
const AlertNotificate = lazy(
  () => import("../../../component/alert/AlertNotificate")
);

const ManagerUserB = () => {
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
              title={`${t("admin home.table_manager_type")} B`}
              data={listDataUsers}
              contentBtnAdd={`${t("admin home.add_user_type")} B`}
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
