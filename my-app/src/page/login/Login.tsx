import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../store/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Form.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateStore } from "../../store/redux/Store";
import AlertNotificate from "../../component/alert/AlertNotificate";
import { useTranslation } from "react-i18next";

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

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state: StateStore) => state.userLogin); // get data store
  const { error, /* loading, */ userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/admin"; // cut path
  const { t } = useTranslation('loginAndRegis');

  /* handle navigate khi Login */
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

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <div style={{ margin: "auto", width: "32%" }}>
        {error ? (
          <AlertNotificate msg={`${error}`} type="error" />
        ) : (
          <h1 className={Styles.titleForm}>{t('login and regis.login')}</h1>
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={`${t('login and regis.username')}`}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input /* onChange={handleInputChange} */ />
          </Form.Item>

          <Form.Item<FieldType>
            label={`${t('login and regis.password')}`}
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
            <Checkbox>Ghi nhớ tài khoản</Checkbox>
            <p>
              <Link to={redirect ? `/register?redirect=` : "/register"}>
                {t('login and regis.create_account')}
              </Link>
            </p>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            {t('login and regis.login')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
