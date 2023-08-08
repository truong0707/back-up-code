import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../store/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Login.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateStore } from "../../store/redux/Store";

export interface TypeObjectInput {
  name?: string;
  password?: string;
  comfirmPass?: string;
}

export interface TypeError {
  name?: string;
  password?: string;
  comfirmPass?: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state: StateStore) => state.userLogin); // get data store
  const { /* error, loading, */ userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/admin"; // cut path

  /* handle navigate khi Login */
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  /* Submit Login */
  const handleSubmitLogin = (values: any) => {
    const loginPromise = login(values.username, values.password);
    loginPromise(dispatch);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Đăng nhập thất bại:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      {/* <h1 className={Styles.Login}>đâsd</h1> */}
      <div className={Styles.formLogin}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input /* onChange={handleInputChange} */ />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
            {/* <Link to={"/register"}>
            <p>Chưa có tk? Register here</p>
          </Link> */}
            <p>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Create Account
              </Link>
            </p>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
