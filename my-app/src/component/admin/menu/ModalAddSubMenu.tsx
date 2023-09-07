import React, {
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Button, Form, FormInstance, Input, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addSubMenuAction } from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import { v4 as uuidv4 } from "uuid";
import {
  addChildToMenu,
  addChildToParentById,
} from "../../../untils/handleArrayMenu";
import { parserStringToNumber } from "../../../untils/parserStringToNumber";

export interface MyInputSubMenu {
  title: string;
  url: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  openModalAddSubMenu: boolean;
  setopenModalAddSubMenu: Dispatch<SetStateAction<boolean>>;
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
  contenBtn?: string;
  parentType?: boolean;
  setTypeParent?: Dispatch<SetStateAction<boolean>>;
}

const ModalAddSubMenu = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail } = getMenu;
  const dispatch = useDispatch();
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const handleCancel = () => {
    props.setopenModalAddSubMenu(false);
  };
  useEffect(() => {
    console.log(props, "typeParentss");
  }, [dispatch, props]);

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

    const idMenu = parserStringToNumber(props.idMenu);
    if (menuDetail && menuDetail.children) {
      if (props.idSubMenu) {
        const idMenuSub = parserStringToNumber(props.idSubMenu);

        let resultAddSub = addChildToParentById(
          props.listDataMenu,
          idMenuSub,
          newValue
        );
        const newData = resultAddSub.filter((menu) => {
          if (menu.id === idMenu) {
            return menu;
          }
        });
        const addSubMenuActionPromise = addSubMenuAction(idMenu, newData[0]);
        addSubMenuActionPromise(dispatch);
        formRef.current?.resetFields();
        props.setopenModalAddSubMenu(false);
      } else {
        let resultAddSub = addChildToMenu(props.listDataMenu, idMenu, newValue);
        const addSubMenuActionPromise = addSubMenuAction(idMenu, resultAddSub);
        addSubMenuActionPromise(dispatch);
        formRef.current?.resetFields();
        if (props.setTypeParent) {
          props.setTypeParent(false);
        }
        props.setopenModalAddSubMenu(false);
      }
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới sub menu"
        open={props.openModalAddSubMenu}
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
            label="url"
            rules={[
              { required: true, whitespace: true },
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
            <Input name="url" defaultValue={"/"} placeholder="url" />
          </Form.Item>

          <Form.Item>
            <Space style={{ marginTop: "10px" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button
                onClick={() => props.setopenModalAddSubMenu(false)}
                type="primary"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSubMenu;
