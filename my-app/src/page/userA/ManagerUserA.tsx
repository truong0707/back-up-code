import React, { useEffect } from "react";
import Doashboard from "../admin/Doashboard";
import Styles from "./ManagerUserA.module.scss";
import { listDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import CRUDUser from "../../component/admin/CRUDUser";

export default function ManagerUserA() {
  const dataUsers = useSelector((state: any) => state.dataUsers); // lấy dữ liệu từ kho redux
  const { loading, error, listDataUsers } = dataUsers;
  const dispatch = useDispatch();

  console.log(listDataUsers, "listDataUsers");

  useEffect(() => {
    const productListPromise = listDataUser();
    productListPromise(dispatch);
  }, [dispatch]);

  return (
    <>
      <Doashboard>
        {loading ? (
          "loading.."
        ) : (
          <div className={Styles.WraperCRUDUser}>
            {listDataUsers ? <CRUDUser data={listDataUsers} /> : "err"}
          </div>
        )}
      </Doashboard>
    </>
  );
}
