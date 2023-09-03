import React, { useEffect, useState } from "react";
import { FormInstance, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Space } from "antd";
import { updateDataUser } from "../../store/redux/actions/dataUserActions";
import { TypeObjectInput } from "../../page/login/Login";
import { StateStore } from "../../store/redux/Store";
import AlertNotificate from "../alert/AlertNotificate";
import { useTranslation } from "react-i18next";
import userServices from "../../services/user";

const ModalBtnUpdate = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState<TypeObjectInput>({});
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
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
    // validate phone number
    const chekPhone = /^\d+$/.test(
      inputs.numberPhone ? inputs.numberPhone : ""
    );

    if (!chekPhone) {
      message.error("Số điện thoại phải là 1 number!");
    } else {
      /* Bắn dispatch */
      const updateUserPromise = updateDataUser(
        `${props.idUser}`,
        `${inputs.email}`,
        `${inputs.name}`,
        `${inputs.numberPhone}`
      );
      updateUserPromise(dispatch);
      formRef.current?.resetFields();
    }

    const myTimeout = setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  useEffect(() => { }, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("adminHome.update")}
      </Button>

      <Modal
        title={`${t("adminHome.update_info")}`}
        open={isModalOpen}
        // onOk={handleOK}
        onCancel={handleCancel}
        footer={null} // Đặt footer thành null để loại bỏ nút "OK"
      >
        {dataUsers.msgUpdateSuccess ? (
          <AlertNotificate msg={"Update thành công"} type={""} />
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
            name={`${t("adminHome.name")}`}
            label={`${t("adminHome.name")}`}
            rules={[{ required: true }, { type: "string", min: 4 }]}
            initialValue={inputs.name}
          >
            <Input
              type="name"
              name="name"
              onChange={handleInputChange}
              placeholder={`${t("adminHome.name")}`}
            />
          </Form.Item>

          <Form.Item
            name={`${t("adminHome.email")}`}
            label={`${t("adminHome.email")}`}
            initialValue={inputs.email}
            rules={[
              { required: true },
              // { type: "url", warningOnly: true },
              { type: "string", min: 4 },
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
            name={`${t("adminHome.phoneNumber")}`}
            label={`${t("adminHome.phoneNumber")}`}
            initialValue={inputs.numberPhone}
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="numberPhone"
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

              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default ModalBtnUpdate;
