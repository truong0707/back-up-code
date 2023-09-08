import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubMenuAction,
  updateFieldMenuAction,
} from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import { v4 as uuidv4 } from "uuid";
import {
  addChildToMenu,
  addChildToParentById,
  handleUpdateChildtreeMenu,
} from "../../../untils/handleArrayMenu";
import { parserStringToNumber } from "../../../untils/parserStringToNumber";

export interface MyInputSubMenu {
  title: string;
  url: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  typeForm: string;
  openModalAddSubMenu?: boolean;
  setopenModalAddSubMenu?: Dispatch<SetStateAction<boolean>>;
  idSubMenu?: string;
  menuDetail?: {
    id: number | number;
    name: string;
    url: string;
    iconClass: string;
    children: [];
  }[];
  listDataMenu: [];
  idMenu: string;
  parentType?: boolean;
  setTypeParent?: Dispatch<SetStateAction<boolean>>;
  openModalUpdateSubMenu?: boolean;
  setopenModalUpdateSubMenu?: Dispatch<SetStateAction<boolean>>;
  titleSub?: string;
  urlSubMenu?: string;
}

const ModalAddAndUpdateSubMenu = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail } = getMenu;
  const dispatch = useDispatch();
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();

  /* updtate  */
  const [inputsCurrent] = useState({
    title: props.titleSub,
    url: props.urlSubMenu,
  });

  const handleCancel = () => {
    if (props.setopenModalAddSubMenu) {
      props.setopenModalAddSubMenu(false);
    } else if (props.setopenModalUpdateSubMenu) {
      props.setopenModalUpdateSubMenu(false);
    }
  };
  useEffect(() => {}, [
    dispatch,
    props,
    props.idSubMenu,
    dispatch,
    props.openModalUpdateSubMenu,
  ]);

  const onFinish = (value: {
    id: number;
    title: string;
    url: string;
    children: never[];
  }) => {
    const newValue = {
      id: parserNumber,
      title: value.title,
      url: value.url,
      children: [],
    };

    if (props.typeForm === "update") {
      if (props.idSubMenu) {
        /* update */
        const newSubmenu = handleUpdateChildtreeMenu(
          menuDetail.children,
          `${value.title}`,
          props.idSubMenu,
          `${value.url}`
        );

        if (menuDetail && menuDetail.children) {
          const updateFielMenuActionPromise = updateFieldMenuAction(
            props.idMenu,
            {
              //   id: 1,
              //   name: "Menu 2 4",
              //   url: "/menu1",
              //   iconClass: "folder-open",
              children: newSubmenu,
            }
          );
          updateFielMenuActionPromise(dispatch);
          if (props.setopenModalUpdateSubMenu) {
            props.setopenModalUpdateSubMenu(false);
          }
          formRef.current?.resetFields();
        }
      }
    }

    /* Add menu */
    if (props.typeForm === "add") {
      const idMenu = parserStringToNumber(props.idMenu);
      if (menuDetail && menuDetail.children) {
        if (props.idSubMenu) {
          const idMenuSub = parserStringToNumber(props.idSubMenu);

          let resultAddSub = addChildToParentById(
            props.listDataMenu,
            idMenuSub,
            newValue
          );
          // eslint-disable-next-line array-callback-return
          const newData = resultAddSub.filter((menu) => {
            if (menu.id === idMenu) {
              return menu;
            }
          });
          const addSubMenuActionPromise = addSubMenuAction(idMenu, newData[0]);
          addSubMenuActionPromise(dispatch);
          formRef.current?.resetFields();

          if (props.setopenModalAddSubMenu) {
            props.setopenModalAddSubMenu(false);
          }
        } else {
          let resultAddSub = addChildToMenu(
            props.listDataMenu,
            idMenu,
            newValue
          );
          const addSubMenuActionPromise = addSubMenuAction(
            idMenu,
            resultAddSub
          );
          addSubMenuActionPromise(dispatch);
          formRef.current?.resetFields();
          if (props.setTypeParent) {
            props.setTypeParent(false);
          }
          if (props.setopenModalAddSubMenu) {
            props.setopenModalAddSubMenu(false);
          }
        }
      }
    }
  };

  const handleClose = () => {
    if (props.setopenModalAddSubMenu) {
      props.setopenModalAddSubMenu(false);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới sub menu"
        open={
          props.openModalAddSubMenu
            ? props.openModalAddSubMenu
            : props.openModalUpdateSubMenu
            ? props.openModalUpdateSubMenu
            : undefined
        }
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            title: inputsCurrent.title,
            url: inputsCurrent.url,
          }}
        >
          <Form.Item
            name="title"
            label="url"
            rules={[
              {
                required: true,
                whitespace: true /* message:'Hãy diền title!' */,
              },
              { type: "string", min: 1 },
            ]}
          >
            <Input name="title" placeholder="title menu" />
          </Form.Item>

          <Form.Item
            name="url"
            label="url"
            rules={[
              { required: true, whitespace: true },
              { type: "string", min: 1 },
            ]}
          >
            <Input name="url" placeholder="url" />
          </Form.Item>

          <Form.Item>
            <Space style={{ marginTop: "10px" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button onClick={handleClose} type="primary">
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddAndUpdateSubMenu;
