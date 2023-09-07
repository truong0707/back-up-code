import React, { Suspense, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../store/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Form.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateStore } from "../../store/redux/Store";
import AlertNotificate from "../../component/alert/AlertNotificate";
import { useTranslation } from "react-i18next";
import LoadingCpn from "../../component/spin/LoadingCpn";

export interface TypeObjectInput {
  email?: string;
  name?: string;
  password?: string;
  comfirmPass?: string;
  numberPhone?: string;
}

export interface TypeError {
  name?: string;
  password?: string;
  comfirmPass?: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state: StateStore) => state.userLogin);
  const { error, userInfo } = userLogin;
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/admin/home"; // cut path
  const { t } = useTranslation("loginAndRegis");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  /* Submit Login */
  const handleSubmitLogin = (values: {
    username: string;
    password: string;
  }) => {
    const loginPromise = login(values.username, values.password);
    loginPromise(dispatch);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <div style={{ margin: "auto", width: "32%" }}>
          {error ? (
            <AlertNotificate msg={`${error}`} type="error" />
          ) : (
            <h1 className={Styles.titleForm}>{t("login and regis.login")}</h1>
          )}
        </div>

        <div className={Styles.formLR}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmitLogin}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label={`${t("login and regis.username")}`}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={`${t("login and regis.password")}`}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  whitespace: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Ghi nhớ tài khoản</Checkbox>
              <p>
                <Link to={redirect ? `/register?redirect=` : "/register"}>
                  {t("login and regis.create_account")}
                </Link>
              </p>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {t("login and regis.login")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Suspense>
    </>
  );
};
export default Login;
