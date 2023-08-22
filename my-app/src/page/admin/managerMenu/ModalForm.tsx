import React, { useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, message, Space } from "antd";

const ModalForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const [data, setData] = useState([])

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  /* form */
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log(value, "e")
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  // const onFill = () => {
  //   form.setFieldsValue({
  //     url: "https://taobao.com/",
  //   });
  // };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add sub menu
      </Button>

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <p>{modalText}</p> */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name Sub menu"
            rules={[
              { required: true },
              // { type: "name", warningOnly: true },
              { type: "string", min: 1 },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Luu
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
