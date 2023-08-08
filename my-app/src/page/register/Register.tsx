import { Button, Checkbox, Form, Input } from "antd";
import { register } from "../../store/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import ".././component/login/Login.scss";
import { useEffect } from "react";
import { StateStore } from "../../store/redux/Store";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state: StateStore) => state.userLogin); // get data store
  const { error, loading, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/"; // cut path

  /* handle navigate khi regis */
  useEffect(() => {
    console.log("re-dender")
    if (userInfo) {
      navigate(redirect + "login" );
    }
  }, [userInfo, navigate, redirect]);

  console.log(userInfo,'sssaf')
  

  /* SUbmit */
  const handleSubmitRegister = (values: any) => {
    const registerPromise = register(
      values.name,
      values.email,
      values.password,
      values.confirmPass,
      values.numberPhone
    );

    registerPromise(dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Đăng nhập thất bại:", errorInfo);
  };

  type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    remember?: string;
    numberPhone?: number;
    confirmPass?: string;
  };

  return (
    <div
      style={{
        margin: "auto",
        background: "#E6E6FA",
        width: "400px",
        padding: "20px",
        borderRadius: "20px",
      }}
      className="Register"
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500, background: "" }}
        initialValues={{ remember: true }}
        onFinish={handleSubmitRegister}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="number phone"
          name="numberPhone"
          rules={[
            { required: true, message: "Please input your number phone!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPass"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
