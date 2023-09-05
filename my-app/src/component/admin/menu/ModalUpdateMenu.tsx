import { Button, Form, FormInstance, Input, Modal, Space, message } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateMenuAction } from "../../../store/redux/actions/menuActions";
import Styles from "../../../page/admin/managerMenu/managerMenu.module.scss";
import { v4 as uuidv4 } from "uuid";

interface MyUpdatePropsMenu {
  handleOK: () => void,
  openModalUpdate: boolean | undefined,
  handleCancel: () => void,
  setOpenModalUpdate: Dispatch<SetStateAction<boolean>>,
  idMenu: number | string,
  nameMenu: string,
  urlMenu: string,
  iconClass: string
}

const  ModalUpdateMenu = (props: MyUpdatePropsMenu) =>  {
  const { t } = useTranslation(["homeAdmin"]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);

  const [valueA, setValue] = useState<{name: string, url: string, iconClass: string}>({
    name: props.nameMenu,
    url: props.urlMenu,
    iconClass: props.iconClass
  });

  useEffect(() => {
  }, [dispatch, setValue, props.idMenu, props.nameMenu, props.openModalUpdate ]);


  /* handle save form */
  const onHandleSave = (value: {
    nameMenu: string;
    url: string;
    iconClass: string;
    children: [];
  }) => {
    setValue({
      name: value.nameMenu,
      url: value.url,
      iconClass: value.iconClass,
    });
    message.success("Đã lưu thông tin!", 2.5);
  };

  /* Handle submit form - Call api */
  const formRef = React.useRef<FormInstance>(null);

  const handleSubmit = () => {
    if (
      !valueA ||
      valueA.name === "" ||
      valueA.url === "" ||
      valueA.iconClass === ""
    ) {
      message.error("Hãy điền thông tin và lưu lại!", 2.5);
    } else {
      const updateMenuActionPromise = updateMenuAction(props.idMenu, valueA);
      updateMenuActionPromise(dispatch);
    }
    props.setOpenModalUpdate(false)
  };

  /* handle change input sub menu */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setValue((state) => ({
      ...state,
      id: parserNumber,
      [nameInput]: valueInput,
    }));
  };

  return (
    <Modal
      open={props.openModalUpdate}
      onOk={props.handleOK}
      onCancel={props.handleCancel}
      footer={null}
    >
      <h4 className={Styles.titleContent}>Update Menu</h4>
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={onHandleSave}
        autoComplete="off"
      >

        <Form.Item
          label={t(`MenuAdmin.name_menu`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input defaultValue={valueA.name} name="name" onChange={handleInputChange} placeholder="vd: Menu1" />
        </Form.Item>


        <Form.Item
          label={t(`MenuAdmin.url`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input defaultValue={valueA.url} name="url" onChange={handleInputChange} placeholder="vd: /menu1 " />
        </Form.Item>

        <Form.Item
          label={t(`MenuAdmin.icon_class`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input defaultValue={valueA.iconClass} name="iconClass" onChange={handleInputChange} placeholder="vd: user, code, folder-open, phone" />
        </Form.Item>

        <Form.Item>
          <Space>

            <Button type="primary" onClick={handleSubmit}>{t(`adminHome.submit`)}</Button>
            <Button type="primary" onClick={props.handleCancel} >Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalUpdateMenu;
