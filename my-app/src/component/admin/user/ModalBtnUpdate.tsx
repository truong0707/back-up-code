import React, { useEffect, useState } from "react";
import { FormInstance, Modal } from "antd";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Space } from "antd";
import { updateDataUser } from "../../../store/redux/actions/dataUserActions";
import { TypeObjectInput } from "../../../page/login/Login";
import { useTranslation } from "react-i18next";
import userServices from "../../../services/user";

const ModalBtnUpdate = (props: { idUser: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState<TypeObjectInput>({});
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  useEffect(() => {
    /* call data default input */
    const dataDefaultInput = async () => {
      const { data } = await userServices.getUserByIDApi(props.idUser);
      if (data) {
        setInputs({
          name: `${data.name}`,
          email: `${data.email}`,
          numberPhone: `${data.numberPhone}`,
        });
      }
    };
    dataDefaultInput();
  }, [props.idUser]);

  /* handle change input */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
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
    /* Bắn dispatch */
    const updateUserPromise = updateDataUser(
      `${props.idUser}`,
      `${inputs.email}`,
      `${inputs.name}`,
      `${inputs.numberPhone}`
    );
    updateUserPromise(dispatch);
    formRef.current?.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("adminHome.update")}
      </Button>

      <Modal
        title={`${t("adminHome.update_info")}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            name: inputs.name,
            email: inputs.email,
            numberPhone: inputs.numberPhone,
          }}
        >
          <Form.Item
            name="name"
            label={`${t("adminHome.name")}`}
            rules={[
              { required: true, whitespace: true },
              { type: "string", min: 4 },
            ]}
          >
            <Input
              type="name"
              name="name"
              onChange={handleInputChange}
              placeholder={`${t("adminHome.name")}`}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={`${t("adminHome.email")}`}
            rules={[
              { required: true },
              { type: "string", min: 4 },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder={`${t("adminHome.email")}`}
            />
          </Form.Item>

          <Form.Item
            name="numberPhone"
            label={`${t("adminHome.phoneNumber")}`}
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="number"
              name="numberPhone"
              onChange={handleInputChange}
              placeholder={`${t("adminHome.phoneNumber")}`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {t("adminHome.submit")}
              </Button>

              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalBtnUpdate;
