import React, { useEffect, useState } from "react";
import { FormInstance, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { StateStore } from "../../../store/redux/Store";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { handleUpdateChildtreeMenu } from "../../../untils/handleArrayMenu";
import { updateFieldMenuAction } from "../../../store/redux/actions/menuActions";


interface myBtnShowModalUpdate {
  titleSub: string,
  id: string | number,
  url: string,
}
const BtnShowModalUpdate = (props: myBtnShowModalUpdate) => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const { menuDetail } = getMenu;

  /* get sub id */
  const [inputs, setInputs] = useState({
    title: props.titleSub,
    url: props.url,
  });

  useEffect(() => { }, [props.id, dispatch]);

  /* input sub update here  */
  const newSubmenu = handleUpdateChildtreeMenu(
    menuDetail.children,
    `${inputs.title}`,
    props.id,
    `${inputs.url}`
  );

  /* handle change input */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  const handleOK = () => {
    if (menuDetail && menuDetail.children) {
      /* Bắn dispatch */
      const updateFielMenuActionPromise = updateFieldMenuAction(pathId, {
        //   id: 1,
        //   name: "Menu 2 4",
        //   url: "/menu1",
        //   iconClass: "folder-open",
        children: newSubmenu,
      });
      updateFielMenuActionPromise(dispatch);
    }

    setIsModalOpen(false);
    formRef.current?.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* handle submit form */
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const onFinish = () => { };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("adminHome.update")}
      </Button>

      <Modal
        title={`${t("adminHome.update_info")}`}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        {/* Form update  */}
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="name"
            rules={[{ required: true }, { type: "string", min: 1 }]}
            initialValue={inputs.title}
          >
            <Input
              type="title"
              name="title"
              onChange={handleInputChange}
              placeholder="name"
            />
          </Form.Item>

          <Form.Item
            name="url"
            label="Url"
            initialValue={inputs.url}
            rules={[
              { required: true },
              // { type: "url", warningOnly: true },
              { type: "string", min: 2 },
            ]}
          >
            <Input
              type="url"
              name="url"
              onChange={handleInputChange}
              placeholder="url"
            />
          </Form.Item>

          <Form.Item>
            {/* <Space>
              <Button type="primary" htmlType="submit">
                {t("adminHome.submit")}
              </Button>
            </Space> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BtnShowModalUpdate;
