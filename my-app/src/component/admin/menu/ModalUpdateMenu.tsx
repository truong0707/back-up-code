import { Button, Form, FormInstance, Input, Modal, Space } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateMenuAction } from "../../../store/redux/actions/menuActions";
import Styles from "../../../page/admin/managerMenu/managerMenu.module.scss";
import { typeMenu, typeMenuNoChildren } from "../../../types/Menu";

interface MyUpdatePropsMenu {
  openModalUpdate: boolean | undefined;
  handleCancel: () => void;
  setOpenModalUpdate: Dispatch<SetStateAction<boolean>>;
  idMenu: number | string;
  nameMenu: string;
  urlMenu: string;
  iconClass: string;
}

const ModalUpdateMenu = (props: MyUpdatePropsMenu) => {
  const { t } = useTranslation(["homeAdmin"]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [value, setValue] = useState<typeMenuNoChildren>({
    name: props.nameMenu,
    url: props.urlMenu,
    iconClass: props.iconClass,
  });

  useEffect(() => {}, [
    dispatch,
    setValue,
    props.idMenu,
    props.nameMenu,
    props.openModalUpdate,
  ]);
  const formRef = React.useRef<FormInstance>(null);
  const onHandleSave = (value: typeMenu) => {
    const updateMenuActionPromise = updateMenuAction(props.idMenu, value);
    updateMenuActionPromise(dispatch);
    props.setOpenModalUpdate(false);
  };

  return (
    <Modal
      open={props.openModalUpdate}
      onCancel={props.handleCancel}
      footer={null}
    >
      <h4 className={Styles.titleContent}>Update Menu</h4>
      <Form
        name="basic"
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={onHandleSave}
        autoComplete="off"
        initialValues={{
          name: value.name,
          url: value.url,
          iconClass: value.iconClass,
        }}
      >
        <Form.Item
          name="name"
          label={t(`MenuAdmin.name_menu`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="vd: Menu1" />
        </Form.Item>

        <Form.Item
          label={t(`MenuAdmin.url`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
          name="url"
        >
          <Input placeholder="vd: /menu1 " />
        </Form.Item>

        <Form.Item
          label={t(`MenuAdmin.icon_class`)}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
          name="iconClass"
        >
          <Input placeholder="vd: user, code, folder-open, phone" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {t(`adminHome.submit`)}
            </Button>

            <Button type="primary" onClick={props.handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateMenu;
