import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Space } from "antd";
import { addDataUser, updateDataUser } from "../../store/redux/actions/dataUserActions";
import { TypeObjectInput } from "../../page/login/Login";
import { StateStore } from "../../store/redux/Store";

export default function ModalBtnAdd(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState<TypeObjectInput>({});
  const updateDataUserStore = useSelector(
    (state: StateStore) => state.addDataUser
  );
  const dispatch = useDispatch();

  /* handle change input */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  /* handle ok */
  const handleOK = () => {
    setIsModalOpen(false);
  };

  /* handle show, cancel */
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* handle submit form */
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

      const alertSuccess =
        updateDataUserStore && updateDataUserStore.msg ? (
          <>{message.success(`Lưu thành công!`)}</>
        ) : null;
    }
    console.log(updateDataUserStore, 'updateDataUserStore')

    const alertErr =
      updateDataUserStore && updateDataUserStore.error ? (
        <>{message.error(`Lưu thất bại!- ${updateDataUserStore.error}`)}</>
      ) : null;
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.contentBtnAdd ? <>{props.contentBtnAdd}</> : "Thêm"}
      </Button>

      <Modal
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        {/* Form update  */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="name"
              name="name"
              onChange={handleInputChange}
              placeholder="Nhập tên"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
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
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="phoneNumber"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="numberPhone"
              name="numberPhone"
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
