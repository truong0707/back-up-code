import React, { useEffect, useState } from "react";
import { FormInstance, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Space } from "antd";
import { addDataUser } from "../../../store/redux/actions/dataUserActions";
import { StateStore } from "../../../store/redux/Store";
import { useTranslation } from "react-i18next";
import AlertNotificate from "../../alert/AlertNotificate";

interface MyModalBtnAdd {
  contentBtnAdd?: string;
}

const ModalBtnAdd = (props: MyModalBtnAdd) => {
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const onFinish = (value: {
    Name: string;
    Email: string;
    NumberPhone: number;
    Password: number;
  }) => {
    const addUserPromise = addDataUser(
      `${value.Name}`,
      `${value.Email}`,
      `${value.NumberPhone}`,
      `${value.Password}`
    );
    addUserPromise(dispatch);
    setIsModalOpen(false);

    formRef.current?.resetFields();
  };

  useEffect(() => {}, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleData = (menu: []) => {
    if (menu) {
      const data = menu.map((dataMenu: { id: string; children: [] }): any => {
        return {
          ...dataMenu,
          key: dataMenu.id,
          children: handleData(dataMenu.children),
        };
      });
      return data;
    }

    return undefined;
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.contentBtnAdd ? <>{props.contentBtnAdd}</> : "Thêm"}
      </Button>

      <Modal
        title={`${t(`adminHome.add_user`)}`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {dataUsers.msgAddSuccess ? (
          <AlertNotificate msg={"Add thành công"} type={""} />
        ) : null}

        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name={`${t(`adminHome.name`)}`}
            label={`${t(`adminHome.name`)}`}
            rules={[
              { required: true, whitespace: true },
              { type: "string", min: 3 },
            ]}
          >
            <Input
              type="name"
              name="name"
              placeholder={`${t(`adminHome.name`)}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t(`adminHome.email`)}`}
            label={`${t(`adminHome.email`)}`}
            rules={[
              { required: true, whitespace: true },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { type: "string", min: 6 },
            ]}
          >
            <Input
              type="email"
              name="email"
              placeholder={`${t(`adminHome.email`)}`}
            />
          </Form.Item>

          <Form.Item
            name="NumberPhone"
            label={`${t(`adminHome.phoneNumber`)}`}
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="number"
              name="numberPhone"
              placeholder={`${t(`adminHome.phoneNumber`)}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t(`adminHome.password`)}`}
            label={`${t(`adminHome.password`)}`}
            rules={[
              { required: true, whitespace: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input
              type="password"
              name="password"
              placeholder={`${t(`adminHome.password`)}`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {t(`adminHome.submit`)}
              </Button>

              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalBtnAdd;
