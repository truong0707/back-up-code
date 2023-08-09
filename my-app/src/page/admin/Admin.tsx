import MasterLayoutDoashBoard from "../../layouts/MasterLayoutDoashBoard";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/redux/actions/userActions";

interface MypropsAmin {
  ifoUser: {
    email?: string;
  };
}

export default function Admin(props: MypropsAmin) {
  // const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
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
          <Button onClick={handleLogOut} type="primary">Đăng Xuất</Button>
        </Space>
      </MasterLayoutDoashBoard>
    </>
  );
}
