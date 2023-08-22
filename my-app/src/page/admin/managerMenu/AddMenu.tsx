import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { addMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";

const AddMenu: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<any>({});
  const [submenu, setSubmenu] = useState<any>([]);
  const [valueA, setValue] = useState<any>();
  const [openModalAddSubMenu, setOpenModalAddSubMenu] = useState(false);

  useEffect(() => {}, [dispatch, submenu]);

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
    message.success("Thêm sub menu thành công!", 2.5);
  };

  /* handle save form */
  const onHandleSave = (value: any) => {
    setValue({
      name: value.nameMenu,
      url: value.urlMenu,
      iconClass: value.iconClass,
      children: submenu,
    });

    message.success("Đã lưu thành công - hãy submit!", 2.5);
  };

  /* Handle submit form - Call api */
  const handleSubmit = () => {
    const addMenuActionPromise = addMenuAction(valueA);
    addMenuActionPromise(dispatch);
    message.success("Submit thành công!", 2.5);
  };

  return (
    <>
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
          <Button onClick={handleOpenModalAddSubMenu}>Thêm menu con</Button>
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
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item
          name="urlMenu"
          label="URL"
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

            <Button onClick={handleSubmit}>Submit</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddMenu;
