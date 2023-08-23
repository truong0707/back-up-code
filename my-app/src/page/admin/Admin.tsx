import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/actions/userActions";
import { useTranslation } from "react-i18next";
import React, { Suspense, lazy } from "react";
import LoadingCpn from "../../component/spin/LoadingCpn";
const SelectOptionLan = lazy(
  () => import("../../component/selectOptionLan/SelectOptionLan")
);

interface MypropsAmin {
  ifoUser: {
    email?: string;
  };
}

const Admin = (props: MypropsAmin) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin", "adminManagerA"]);

  /* Submit Login */
  const handleLogOut = () => {
    const logOutPromise = logout();
    logOutPromise(dispatch);
  };

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <Space>
          <p>
            {t("adminHome.hi_user")}: <b>{props.ifoUser.email}</b>s
          </p>

          <SelectOptionLan />
          <Button onClick={handleLogOut} type="primary">
            {t("adminHome.log_out")}
          </Button>
        </Space>
      </Suspense>
    </>
  );
};
export default Admin;
