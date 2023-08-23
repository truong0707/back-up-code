import React, { useEffect, useState } from "react";
import { FormInstance, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Space } from "antd";
import { addDataUser } from "../../store/redux/actions/dataUserActions";
import { TypeObjectInput } from "../../page/login/Login";
import { StateStore } from "../../store/redux/Store";
import { useTranslation } from "react-i18next";
import AlertNotificate from "../alert/AlertNotificate";

interface MyModalBtnAdd {
  contentBtnAdd?: string;
}

const ModalBtnAdd = (props: MyModalBtnAdd) => {
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState<TypeObjectInput>({});
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  /* handle change input */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  /* handle ok */
  const handleOK = () => {
    setIsModalOpen(false);
    formRef.current?.resetFields();
  };

  /* handle show, cancel */
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* handle submit form */
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const onFinish = () => {
    // validate phone number
    const chekPhone = /^\d+$/.test(
      inputs.numberPhone ? inputs.numberPhone : ""
    );

    if (!chekPhone) {
      message.error("Số điện thoại phải là 1 number!");
    } else {
      /* Bắn dispatch */
      const addUserPromise = addDataUser(
        `${inputs.name}`,
        `${inputs.email}`,
        `${inputs.numberPhone}`,
        `${inputs.password}`
      );
      addUserPromise(dispatch);
      setIsModalOpen(false);
    }

    formRef.current?.resetFields();
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.contentBtnAdd ? <>{props.contentBtnAdd}</> : "Thêm"}
      </Button>

      <Modal
        title={`${t(`admin home.add_user`)}`}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        {dataUsers.msgAddSuccess ? (
          <AlertNotificate msg={"Add thành công"} type={""} />
        ) : null}
        {/* Form update  */}
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name={`${t(`admin home.name`)}`}
            label={`${t(`admin home.name`)}`}
            rules={[{ required: true }, { type: "string", min: 3 }]}
          >
            <Input
              type="name"
              name="name"
              onChange={handleInputChange}
              placeholder={`${t(`admin home.name`)}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t(`admin home.email`)}`}
            label={`${t(`admin home.email`)}`}
            rules={[
              { required: true },
              // { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder={`${t(`admin home.email`)}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t(`admin home.phoneNumber`)}`}
            label={`${t(`admin home.phoneNumber`)}`}
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="numberPhone"
              name="numberPhone"
              onChange={handleInputChange}
              placeholder={`${t(`admin home.phoneNumber`)}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t(`admin home.password`)}`}
            label={`${t(`admin home.password`)}`}
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder={`${t(`admin home.password`)}`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {t(`admin home.submit`)}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default ModalBtnAdd;
