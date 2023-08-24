import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Space, message } from "antd";
import { addMenuAction } from "../../../store/redux/actions/menuActions";
import { useDispatch } from "react-redux";
import Styles from "./managerMenu.module.scss";
import { useTranslation } from "react-i18next";

interface MyInputSubMenu {
  title: string;
  urlSubMenu: string;
}

interface MyAllInfoInput {
  name: string;
  iconClass: string;
  url: string;
  children: [];
}

const AddMenu: React.FC = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /* Sub menu */
  const [inputs, setInputs] = useState<MyInputSubMenu>({
    title: "",
    urlSubMenu: "",
  });
  const [submenu, setSubmenu] = useState<any>([]);

  const [valueA, setValue] = useState<MyAllInfoInput>();
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

    setInputs((state: MyInputSubMenu) => ({
      ...state,
      [nameInput]: valueInput,
    })); //
  };

  /* handle add submenu */
  const handleClickAddSubMenu = () => {
    /* Check input empty - don't submit */
    const parser = JSON.stringify(inputs.title ? inputs.title : "");
    const items = parser.replace(/\s+/g, "");

    if (items.length > 2) {
      setSubmenu((state: []) => [...state, inputs]);
    }
    message.success("Thêm sub menu thành công!", 2.5);
  };

  /*  clear */
  const handleClearModalAddSubMenu = () => {
    setSubmenu([]);
  };

  /* handle save form */
  const onHandleSave = (value: {
    nameMenu: string;
    urlMenu: string;
    iconClass: string;
    children: [];
  }) => {
    setValue({
      name: value.nameMenu,
      url: value.urlMenu,
      iconClass: value.iconClass,
      children: submenu,
    });

    message.success("Đã lưu thành công - hãy submit!", 2.5);
  };

  /* Handle submit form - Call api */
  const formRef = React.useRef<FormInstance>(null);
  const handleSubmit = () => {
    if (
      !valueA ||
      valueA.name === "" ||
      valueA.url === "" ||
      valueA.iconClass === ""
    ) {
      message.error("Hãy điền thông tin và lưu lại!", 2.5);
    } else {
      const addMenuActionPromise = addMenuAction(valueA);
      addMenuActionPromise(dispatch);
    }

    /* reset Value input */
    setValue({
      name: "",
      iconClass: "",
      url: "",
      children: [],
    });

    formRef.current?.resetFields();
  };

  useEffect(() => {}, [dispatch, submenu]);

  return (
    <>
      {openModalAddSubMenu ? (
        <>
          <div>
            <h4 className={Styles.titleContent}>{t(`MenuAdmin.sub_menu`)}</h4>

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

          <p className={Styles.titleContent}>{t(`MenuAdmin.list_menu`)}</p>

          {submenu ? (
            <>
              <ul className={Styles.listSubMenu}>
                <>
                  {submenu.map(
                    (
                      data: {
                        title: string;
                        url: string;
                      },
                      index: number
                    ) => (
                      <li key={index}>
                        {index + 1}. nameSub: {data.title}
                      </li>
                    )
                  )}
                </>
              </ul>
            </>
          ) : (
            "empty"
          )}

          <Space className={Styles.wrapperBtnAdd}>
            <Button type="primary" onClick={handleClickAddSubMenu}>
              {t(`MenuAdmin.add_sub_menu`)}
            </Button>
            <Button danger  onClick={handleClearModalAddSubMenu}>
              {t(`MenuAdmin.clear`)}
            </Button>
            <Button onClick={handleCloseModalAddSubMenu}>
              {t(`MenuAdmin.close`)}
            </Button>
          </Space>
        </>
      ) : (
        <Space>
          <Button onClick={handleOpenModalAddSubMenu}>
            {t(`MenuAdmin.add_sub_menu`)}
          </Button>
        </Space>
      )}

      {/* Main menu */}
      <h4 className={Styles.titleContent}>Menu</h4>
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={onHandleSave}
        autoComplete="off"
      >
        <Form.Item
          name="nameMenu"
          label={t(`MenuAdmin.name_menu`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input placeholder="vd: Menu1 " />
        </Form.Item>

        <Form.Item
          name="urlMenu"
          label={t(`MenuAdmin.url`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
          initialValue={"/"}
        >
          <Input placeholder="vd: /menu1 " />
        </Form.Item>

        <Form.Item
          name="iconClass"
          label={t(`MenuAdmin.icon_class`)}
          rules={[{ required: true }, { type: "string", min: 1 }]}
        >
          <Input placeholder="vd: user, code, folder-open, phone" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {t(`MenuAdmin.save`)}
            </Button>

            <Button onClick={handleSubmit}>{t(`adminHome.submit`)}</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddMenu;
