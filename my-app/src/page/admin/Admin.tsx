import MasterLayoutDoashBoard from "../../layouts/MasterLayoutDoashBoard";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/actions/userActions";
import SelectOptionLan from "../../component/selectOptionLan/SelectOptionLan";

interface MypropsAmin {
  ifoUser: {
    email?: string;
  };
}

export default function Admin(props: MypropsAmin) {
  const dispatch = useDispatch();

  /* Submit Login */
  const handleLogOut = (values: any) => {
    const logOutPromise = logout();
    logOutPromise(dispatch);
  };

  return (
    <>
      <MasterLayoutDoashBoard>
        <Space>
          <p>
            Chào : <b>{props.ifoUser.email}</b>
          </p>

          <SelectOptionLan/>
          <Button onClick={handleLogOut} type="primary">Đăng Xuất</Button>
        </Space>
      </MasterLayoutDoashBoard>
    </>
  );
}
