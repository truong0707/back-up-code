import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, /* message */ Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addMenuAction,
  getDetailMenuAction,
  updateMenuAction,
} from "../../../../store/redux/actions/menuActions";
import { StateStore } from "../../../../store/redux/Store";
import menuServices from "../../../../services/menu";

interface MyPropsModalNomal {
  idMenu: string | number | null;
  titleModal: string;
  showMoal: boolean;
  setShowModalUpdate: (a: boolean) => void;
  menuDetail: any;
}

export default function ModalNomal(props: MyPropsModalNomal) {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const [defaultValueInput, setDefaultValue] = useState<any>();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  /* input sub menu */
  const [inputs, setInputs] = useState<any>({});
  const [submenu, setSubmenu] = useState<any>([]);

  /* total value  */
  const [valueA, setValue] = useState<any>({});

  /* show/hide  sub menu  */
  const [openModalAddSubMenu, setOpenModalAddSubMenu] = useState(false);

  /* Show/hide add submenu */
  const handleOpenModalAddSubMenu = () => {
    setOpenModalAddSubMenu(true);
  };
  const handleCloseModalAddSubMenu = () => {
    setOpenModalAddSubMenu(false);
  };

  /* handle change input sub menu */
  const handleInputChangeSubMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state: any) => ({ ...state, [nameInput]: valueInput })); //
  };

  /* handle add submenu */
  const handleClickAddSubMenu = () => {
    /* Check input empty - don't submit */
    const parser = JSON.stringify(inputs.title ? inputs.title : "");
    const items = parser.replace(/\s+/g, "");

    if (items.length > 2) {
      setSubmenu((state: any) => [...state, inputs]);
    }

    alert("Thêm sub menu thành công!");
  };

  /* handle save form */
  const onHandleSave = (value: any) => {
    setValue({
      name: value.nameMenu,
      url: value.urlMenu,
      iconClass: value.iconClass,
      children: submenu,
    });
    alert("Đã lưu thành công - hãy submit!");
  };

  /* Handle submit form - Call api */
  const handleSubmit = () => {
    if (props.idMenu) {
      const updateMenuActionPromise = updateMenuAction(props.idMenu, valueA);
      updateMenuActionPromise(dispatch);

      alert("Submit thành công!");
      props.setShowModalUpdate(false);
    } else {
      alert("miss id");
    }
  };

  const handleCancel = () => {
    props.setShowModalUpdate(false);
  };

  useEffect(() => {
    if (props.idMenu) {
      const dataDetailMenuPromise = getDetailMenuAction(props.idMenu);
      dataDetailMenuPromise(dispatch);
      setDefaultValue(getMenu.menuDetail);

      const dataDefaultInput = async () => {
        const { data } = await menuServices.getMenuByIdApi(props.idMenu);
        if (data) {
          setValue({
            name: data.name,
            url: data.url,
            iconClass: data.iconClass,
            children: submenu,
          });
        }
      };
      dataDefaultInput();
    }
  }, [dispatch, props.idMenu, defaultValueInput]);

  return (
    <>
      <Modal
        title={`${props.titleModal}`}
        open={props.showMoal}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {openModalAddSubMenu ? (
          <>
            <div>
              <h4 style={{ marginBottom: "10px" }}>Sub menu</h4>

              <Space>
                <Space direction="vertical">
                  <Input
                    name="title"
                    onChange={handleInputChangeSubMenu}
                    placeholder="name Sub menu"
                  />
                </Space>

                <Space direction="vertical">
                  <Input
                    name="urlSubMenu"
                    onChange={handleInputChangeSubMenu}
                    placeholder="url"
                  />
                </Space>
              </Space>
            </div>

            {/* <p>List sub menu :</p> */}
            {submenu ? (
              <>
                {submenu.map((data: any, index: number) => (
                  <li key={index}>nameSub: {data.title}</li>
                ))}
              </>
            ) : (
              "null"
            )}

            <Space style={{ marginTop: "10px", paddingBottom: "30px" }}>
              <Button type="primary" onClick={handleClickAddSubMenu}>
                add Sub menu
              </Button>
              <Button onClick={handleCloseModalAddSubMenu}>close</Button>
            </Space>
          </>
        ) : (
          <Space style={{ paddingBottom: "17px" }}>
            <Button onClick={handleOpenModalAddSubMenu}>update menu con</Button>
          </Space>
        )}

        {/* Main menu */}
        <h4 style={{ marginBottom: "10px" }}>Main menu</h4>
        <Form
          form={form}
          layout="vertical"
          onFinish={onHandleSave}
          autoComplete="off"
        >
          <Form.Item
            name="nameMenu"
            label="Name menu"
            // initialValue={valueA.name ? `${valueA.name}` : undefined}
            rules={[{ required: true }, { type: "string", min: 1 }]}
          >
            {/* {valueA.name ? <>{valueA.name}da</> : "sád"} */}
            <Input name="nameMenu" placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="urlMenu"
            label="URL"
            initialValue={valueA.name}
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 1 },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            name="iconClass"
            label="Icon Class"
            rules={[{ required: true }, { type: "string", min: 1 }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                save
              </Button>

              {/* <Button onClick={handleSubmit}>Submit</Button> */}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
