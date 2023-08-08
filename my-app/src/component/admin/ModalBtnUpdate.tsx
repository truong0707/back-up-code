import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Space } from "antd";
import { updateDataUser } from "../../store/redux/actions/dataUserActions";

export default function ModalBtnUpdate(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  /* Handle handleUpdate */
  const handleUpdate = () => {
    setIsModalOpen(false);

    const updateUserPromise = updateDataUser(2);
    updateUserPromise(dispatch);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /*  */
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  //   const onFill = () => {
  //     form.setFieldsValue({
  //       url: "https://taobao.com/",
  //     });
  //   };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>

      <Modal
        title="Update Ifo"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        {/* Form update  */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="phoneNumber"
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item>
            <Space>
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onFill}>
                Fill
              </Button> */}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
