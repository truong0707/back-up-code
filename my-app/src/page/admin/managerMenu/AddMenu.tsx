import React, { Suspense, useEffect } from "react";
import { Button, Form, FormInstance, Input, Space, message } from "antd";
import { addMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";
import Styles from "./managerMenu.module.scss";
import { useTranslation } from "react-i18next";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import { checkStringEmpty } from "../../../untils/checkStringEmpty";
import { typeMenu } from "../../../types/Menu";

const AddMenu: React.FC = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /* Handle submit form - Call api */
  const formRef = React.useRef<FormInstance>(null);
  const onHandleSubmit = (value: typeMenu) => {
    if (value) {
      const newValue: typeMenu = {
        name: value.name,
        url: value.url,
        iconClass: value.iconClass,
        children: [],
      };
      const checkNameEmpty = checkStringEmpty(value.name);
      const checkUrlEmpty = checkStringEmpty(value.url);
      const checkUrlIconClass = checkStringEmpty(value.iconClass);

      if (checkNameEmpty.length === 2) {
        message.error("Hãy điền name và lưu lại!", 2.5);
      } else if (checkUrlEmpty.length === 2) {
        message.error("Hãy điền url và lưu lại!", 2.5);
      } else if (checkUrlIconClass.length === 2) {
        message.error("Hãy điền icon và lưu lại!", 2.5);
      } else {
        const addMenuActionPromise = addMenuAction(newValue);
        addMenuActionPromise(dispatch);
        formRef.current?.resetFields();
      }
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
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input placeholder="vd: Menu1 " />
        </Form.Item>

        <Form.Item
          name="url"
          label={t(`MenuAdmin.url`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
          initialValue={"/"}
        >
          <Input placeholder="vd: /menu1 " />
        </Form.Item>

        <Form.Item
          name="iconClass"
          label={t(`MenuAdmin.icon_class`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
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
