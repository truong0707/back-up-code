import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../../store/redux/Store";
import { useLocation } from "react-router-dom";
import { getDataDetailUser } from "../../../store/redux/actions/dataUserActions";
import { Suspense, useEffect } from "react";
import { Card } from "antd";
import React from "react";
import LoadingCpn from "../../../component/spin/LoadingCpn";

const UserDetail = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const location = useLocation();
  const pathId = location.pathname.split("/")[3]; /* cat id  params*/
  const { dataUserDetail }: any = dataUsers;

  useEffect(() => {
    const getUserDetailPromise = getDataDetailUser(pathId);
    getUserDetailPromise(dispatch);
  }, [dispatch, pathId]);

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        {dataUserDetail ? (
          <Card
            hoverable
            style={{ width: "100%" }}
            // cover={
            //   <img
            //     alt="example"
            //     src=""
            //   />
            // }
          >
            <Meta title="User Detail" /* description="www.instagram.com" */ />
            <p>name: {`${dataUserDetail.name}`}</p>
            <p>id: {`${dataUserDetail.id}`}</p>
            <p>email: {`${dataUserDetail.email}`}</p>
          </Card>
        ) : (
          <LoadingCpn />
        )}
      </Suspense>
    </>
  );
};
export default UserDetail;
