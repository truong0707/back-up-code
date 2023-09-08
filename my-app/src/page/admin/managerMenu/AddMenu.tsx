import React, { Suspense, useEffect } from "react";
import { Button, Form, FormInstance, Input, Space, message } from "antd";
import { addMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";
import Styles from "./managerMenu.module.scss";
import { useTranslation } from "react-i18next";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { typeMenu } from "../../../types/Menu";

const AddMenu: React.FC = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formRef = React.useRef<FormInstance>(null);
  const onHandleSubmit = (value: typeMenu) => {
    if (value) {
      const newValue: typeMenu = {
        name: value.name,
        url: value.url,
        iconClass: value.iconClass,
        children: [],
      };
      const addMenuActionPromise = addMenuAction(newValue);
      addMenuActionPromise(dispatch);
      formRef.current?.resetFields();
    } else {
      message.error("Hãy điền thông tin!", 2.5);
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <Suspense fallback={<LoadingCpn />}>
      <h4 className={Styles.titleContent}>Menu</h4>
      
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={onHandleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label={t(`MenuAdmin.name_menu`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="vd: Menu1 " />
        </Form.Item>

        <Form.Item
          name="url"
          label={t(`MenuAdmin.url`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
          initialValue={"/"}
        >
          <Input placeholder="vd: /menu1 " />
        </Form.Item>

        <Form.Item
          name="iconClass"
          label={t(`MenuAdmin.icon_class`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="vd: user, code, folder-open, phone, folder" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Suspense>
  );
};

export default AddMenu;
