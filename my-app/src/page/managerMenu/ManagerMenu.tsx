import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import SelectTab from "../../component/select/SelectTab";
import ModalForm from "./ModalForm";
import { addMenuAction } from "../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";
import ListScroll from "../../component/list/ListScroll";

const ManagerMenu: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const onFinishFailed = () => {
  //   message.error("Submit failed!");
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
      url: value.urlMenu,
      iconClass: value.iconClass,
      children: submenu,
    });
    alert("Đã lưu thành công - hãy submit !");
  };

  useEffect(() => {}, [dispatch, submenu]);

  /* handleChange */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state: any) => ({ ...state, [nameInput]: valueInput })); //
  };

  const handleClickAddSubMenu = () => {
    /* Check input empty - don't submit */
    const parser = JSON.stringify(inputs.name ? inputs.name : "");
    const items = parser.replace(/\s+/g, "");

    if (items.length > 2) {
      setSubmenu((state: any) => [...state, inputs]);
    }

    alert("Thêm sub menu thành công!");
  };

  const handleSubmit = () => {
    const addMenuActionPromise = addMenuAction(valueA);
    addMenuActionPromise(dispatch);

    alert("Submit thành công!")
  };

  return (
    <>
      {openModalAddSubMenu ? (
        <>
          <div
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>Sub menu</h4>

            <Space>
              <Space direction="vertical">
                {/* <p>name</p> */}
                <Input
                  name="name"
                  onChange={handleInputChange}
                  placeholder="name"
                />
              </Space>

              <Space direction="vertical">
                {/* <p>url</p> */}
                <Input
                  name="urlSubMenu"
                  onChange={handleInputChange}
                  placeholder="url"
                />
              </Space>
            </Space>
          </div>

          {/* <p>List sub menu :</p> */}
          {/* <ListScroll/> */}
          {submenu ? (
            <>
              {submenu.map((data: any, index: number) => (
                <li key={index}>nameSub: {data.name}</li>
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

export default ManagerMenu;
