import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormInstance, Modal, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { StateStore } from "../../../store/redux/Store";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { handleUpdateChildtreeMenu } from "../../../untils/handleArrayMenu";
import { updateFieldMenuAction } from "../../../store/redux/actions/menuActions";
import { checkStringEmpty } from "../../../untils/checkStringEmpty";
import { TypeSubmenu } from "../../../types/Menu";

interface myBtnShowModalUpdate {
  titleSub: string;
  id: string | number;
  url: string;
  openModalUpdateSubMenu: boolean;
  setopenModalUpdateSubMenu: Dispatch<SetStateAction<boolean>>;
}
const BtnShowModalUpdate = (props: myBtnShowModalUpdate) => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);
  const { menuDetail } = getMenu;
  const [inputsCurrent] = useState({
    title: props.titleSub,
    url: props.url,
  });

  useEffect(() => {}, [props.id, dispatch, props.openModalUpdateSubMenu]);

  const handleCancel = () => {
    props.setopenModalUpdateSubMenu(false);
  };

  /* handle submit form */
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();

  const onFinish = (value: TypeSubmenu) => {
    const newSubmenu = handleUpdateChildtreeMenu(
      menuDetail.children,
      `${value.title}`,
      props.id,
      `${value.url}`
    );
    /* Check input empty */
    const checkTitleEmpty = checkStringEmpty(value.title);
    const checkUrlEmpty = checkStringEmpty(value.url);

    if (menuDetail && menuDetail.children) {
      if (checkTitleEmpty.length === 2) {
        message.error("Không thể để Title trống!");
      } else if (checkUrlEmpty.length === 2) {
        message.error("không thể để trống url");
      } else {
        const updateFielMenuActionPromise = updateFieldMenuAction(pathId, {
          //   id: 1,
          //   name: "Menu 2 4",
          //   url: "/menu1",
          //   iconClass: "folder-open",
          children: newSubmenu,
        });
        updateFielMenuActionPromise(dispatch);
        props.setopenModalUpdateSubMenu(false);
        formRef.current?.resetFields();
      }
    }
  };

  return (
    <Modal
      title={`${t("adminHome.update_info")}`}
      open={props.openModalUpdateSubMenu}
      footer={null}
      onCancel={handleCancel}
    >
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
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
          initialValue={inputsCurrent.title}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          name="url"
          label="Url"
          initialValue={inputsCurrent.url}
          rules={[
            { required: true, whitespace: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="url" defaultValue={"/"} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => props.setopenModalUpdateSubMenu(false)}
              type="primary"
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BtnShowModalUpdate;
