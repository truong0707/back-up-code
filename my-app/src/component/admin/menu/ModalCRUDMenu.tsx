import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addMenuAction,
  addSubMenuAction,
  updateFieldMenuAction,
  updateMenuAction,
} from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import { v4 as uuidv4 } from "uuid";
import {
  addChildToMenu,
  addChildToParentById,
  handleUpdateChildtreeMenu,
} from "../../../untils/handleArrayMenu";
import { parserStringToNumber } from "../../../untils/parserStringToNumber";
import { typeMenu } from "../../../types/Menu";

export interface MyInputSubMenu {
  title: string;
  url: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  titleModal: string;
  typeModal: string;
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
  namedefault?: string;
  urlDefault?: string;
  iconDefault?: string;
  openModalAddMenu?: boolean;
  setopenModalAddMenu?: Dispatch<SetStateAction<boolean>>;
  openModalUpdateMenu?: boolean;
  setOpenModalUpdateMenu?: Dispatch<SetStateAction<boolean>>;
}

const ModalCRUDMenu = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail } = getMenu;
  const dispatch = useDispatch();
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();

  const [inputsCurrent] = useState({
    title: props.namedefault,
    urlDefault: props.urlDefault,
    iconDefault: props.iconDefault,
  });

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
    iconClass: string;
  }) => {
    const newValue = {
      id: parserNumber,
      title: value.title,
      url: value.url,
      iconClass: value.iconClass,
      children: [],
    };

    /* update menu */
    if (props.typeModal === "update-menu") {
      if (value) {
        const NewMenu = {
          name: value.title,
          url: value.url,
          iconClass: value.iconClass,
        };

        const updateMenuActionPromise = updateMenuAction(props.idMenu, NewMenu);
        updateMenuActionPromise(dispatch);

        if (props.setOpenModalUpdateMenu) {
          props.setOpenModalUpdateMenu(false);
        }
      } else {
        message.error("Hãy điền thông tin!", 2.5);
      }
    }

    /* add menu */
    if (props.typeModal === "add-menu") {
      if (value) {
        const newValue: typeMenu = {
          name: value.title,
          url: value.url,
          iconClass: value.iconClass,
          children: [],
        };
        const addMenuActionPromise = addMenuAction(newValue);
        addMenuActionPromise(dispatch);
        formRef.current?.resetFields();
        if (props.setopenModalAddMenu) {
          props.setopenModalAddMenu(false);
        }
      } else {
        message.error("Hãy điền thông tin!", 2.5);
      }
    }

    /* update Sub */
    if (props.typeModal === "update") {
      if (props.idSubMenu) {
        console.log(newValue);
        const newSubmenu = handleUpdateChildtreeMenu(
          menuDetail.children,
          `${value.title}`,
          props.idSubMenu,
          `${value.url}`,
          `${value.iconClass}`
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

    /* Add sub menu */
    if (props.typeModal === "add") {
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

  /* handle cancle  */
  const handleClose = () => {
    if (props.setopenModalAddSubMenu) {
      props.setopenModalAddSubMenu(false);
    } else if (props.setopenModalAddMenu) {
      props.setopenModalAddMenu(false);
    } else if (props.setopenModalUpdateSubMenu) {
      props.setopenModalUpdateSubMenu(false);
    } else if (props.setOpenModalUpdateMenu) {
      props.setOpenModalUpdateMenu(false);
    }
  };

  return (
    <>
      <Modal
        title={props.titleModal}
        open={
          props.openModalAddSubMenu
            ? props.openModalAddSubMenu
            : props.openModalUpdateSubMenu
            ? props.openModalUpdateSubMenu
            : props.openModalAddMenu
            ? props.openModalAddMenu
            : props.openModalUpdateMenu
            ? props.openModalUpdateMenu
            : undefined
        }
        footer={null}
        onCancel={handleClose}
      >
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            title: inputsCurrent.title,
            url: inputsCurrent.urlDefault,
            iconClass: inputsCurrent.iconDefault,
          }}
        >
          <Form.Item
            name="title"
            label="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "'name' is required!",
              },
              { type: "string", min: 1 },
            ]}
          >
            <Input placeholder="title menu" />
          </Form.Item>

          <Form.Item
            name="iconClass"
            label="iconClass"
            rules={[
              {
                required: true,
                whitespace: true,
              },
              { type: "string", min: 1 },
            ]}
          >
            <Input placeholder="title menu" />
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

              <Button onClick={handleClose} type="primary" ghost>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCRUDMenu;
