import MasterLayoutDoashBoard from "../../layouts/MasterLayoutDoashBoard";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/actions/userActions";
import SelectOptionLan from "../../component/selectOptionLan/SelectOptionLan";
import { useTranslation } from "react-i18next";

interface MypropsAmin {
  ifoUser: {
    email?: string;
  };
}

export default function Admin(props: MypropsAmin) {
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin", "adminManagerA"]);

  /* Submit Login */
  const handleLogOut = () => {
    const logOutPromise = logout();
    logOutPromise(dispatch);
  };

  return (
    <>
      <MasterLayoutDoashBoard>
        <Space>
          <p>
            {t("admin home.hi_user")}: <b>{props.ifoUser.email}</b>
          </p>

          <SelectOptionLan />
          <Button onClick={handleLogOut} type="primary">
            {t("admin home.log_out")}
          </Button>
        </Space>
      </MasterLayoutDoashBoard>
    </>
  );
}
