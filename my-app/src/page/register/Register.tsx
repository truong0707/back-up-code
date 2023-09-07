import { Button, Checkbox, Form, Input } from "antd";
import { register } from "../../store/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StateStore } from "../../store/redux/Store";
import {useNavigate } from "react-router-dom";
import Styles from "../login/Form.module.scss";
import AlertNotificate from "../../component/alert/AlertNotificate";
import { useTranslation } from "react-i18next";
import React from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state: StateStore) => state.userLogin); 
  const { error, userInfo } = userLogin;
  const { t } = useTranslation("loginAndRegis");

  const handleSubmitRegister = (values: {
    name: string;
    email: string;
    password: string;
    confirmPass: string;
    numberPhone: string;
  }) => {
    const registerPromise = register(
      values.name,
      values.email,
      values.password,
      values.confirmPass,
      values.numberPhone
    );

    registerPromise(dispatch);
  };

  useEffect(() => {
  }, [userInfo, navigate]);

  return (
    <>
      <div style={{ margin: "auto", width: "32%" }}>
        {error ? (
          <AlertNotificate msg={`${error}`} type="error" />
        ) : (
          <h1 className={Styles.titleForm}>{t("login and regis.register")}</h1>
        )}
      </div>

      <div className={Styles.formLR}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitRegister}
          autoComplete="off"
        >
          <Form.Item
            label={`${t("login and regis.name")}`}
            name="name"
            rules={[
              {
                required: true,
                message: t("login and regis.input_your_name"),
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={`${t("login and regis.email")}`}
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={`${t("login and regis.number_phone")}`}
            name="numberPhone"
            rules={[
              {
                required: true,
                message: t("login and regis.input_your_numberPhone"),
                whitespace: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label={`${t("login and regis.password")}`}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={`${t("login and regis.confirm_password")}`}
            name="confirmPass"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("login and regis.input_your_passwordConfirm"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox checked>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {t("login and regis.register")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Register;
