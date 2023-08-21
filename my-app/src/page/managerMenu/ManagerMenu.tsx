import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import SelectTab from "../../component/select/SelectTab";
import ModalForm from "./ModalForm";
import { addMenuAction } from "../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";

const ManagerMenu: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const onFinishFailed = () => {
  //   message.error("Submit failed!");
  // };

  // const onFill = () => {
  //   form.setFieldsValue({
  //     url: "https://taobao.com/",
  //   });
  // };

  /*  */
  const [inputs, setInputs] = useState<any>({});
  // const subMenu: any = [];
  const [submenu, setSubmenu] = useState<any>([]);
  const [valueA, setValue] = useState<any>();
  const [openModalAddSubMenu, setOpenModalAddSubMenu] = useState(false);

  const handleOpenModalAddSubMenu = () => {
    setOpenModalAddSubMenu(true);
  };
  const handleCloseModalAddSubMenu = () => {
    setOpenModalAddSubMenu(false);
  };

  const onHandleSave = (value: any) => {
    setValue({
      name: value.nameMenu,
      children: submenu,
    });
    console.log(valueA, "result");
    alert("save thanh cong!");
  };

  useEffect(() => {}, [dispatch]);

  /* handleChange */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state: any) => ({ ...state, [nameInput]: valueInput })); //
  };

  const handleClick = () => {
    console.log(inputs, "inputs");
    /* Check input empty - don't submit */
    const parser = JSON.stringify(inputs);
    const items = parser.replace(/\s/g, "");

    console.log(items.length);
    console.log(parser, "s");

    // if (items.length < 2) {
    //   alert("ddieen ");
    // } else {
    setSubmenu((state: any) => [...state, inputs]);
    // }

    console.log(submenu, "submenu");
  };

  const handleSubmit = () => {
    const addMenuActionPromise = addMenuAction(valueA);
    addMenuActionPromise(dispatch);
  };

  return (
    <>
      {openModalAddSubMenu ? (
        <div
          style={{
            padding: "5px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          }}
        >
          <h3>Add Sub menu</h3>
          <p>Name sub menu</p>
          <Input
            name="name"
            onChange={handleInputChange}
            placeholder="input placeholder"
          />
          {submenu && submenu.length < 0 ? (
            <>
              {submenu.map((data: any, index: number) => (
                <li key={index}>nameSub: {data.name}</li>
              ))}
            </>
          ) : null}

          <Form.Item
            name="urlSubMenu"
            label="Url Sub Menu"
            // rules={[{ required: true }, { type: "string", min: 1 }]}
          >
            <Input
              name="urlSubMenu"
              onChange={handleInputChange}
              placeholder="input placeholder"
            />
          </Form.Item>

          <Space style={{ paddingBottom: "17px" }}>
            <Button onClick={handleClick}>add Sub menu</Button>
            <Button onClick={handleCloseModalAddSubMenu}>close</Button>
          </Space>
        </div>
      ) : (
        <Space style={{ paddingBottom: "17px" }}>
          <Button onClick={handleOpenModalAddSubMenu}>Thêm menu con</Button>
        </Space>
      )}

      {/* Main menu */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onHandleSave}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="nameMenu"
          label="Name menu"
          rules={[
            { required: true },
            // { type: "email", warningOnly: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item
          name="url"
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
          rules={[
            { required: true },
            { type: "url", warningOnly: true },
            { type: "string", min: 1 },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              save
            </Button>

            <Button onClick={handleSubmit}>Sumit</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default ManagerMenu;
