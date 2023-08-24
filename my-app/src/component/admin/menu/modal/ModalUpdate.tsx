import React, { useEffect, useState } from "react";
import { FormInstance, Modal, message } from "antd";
import { Button, Form, Input, /* message */ Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  // getDetailMenuAction,
  updateMenuAction,
} from "../../../../store/redux/actions/menuActions";
import { StateStore } from "../../../../store/redux/Store";
// import menuServices from "../../../../services/menu";
import Styles from "../../../../page/admin/managerMenu/managerMenu.module.scss";
import { useTranslation } from "react-i18next";

interface MyPropsModalNomal {
  idMenu: string | number | null;
  titleModal: string;
  showMoal: boolean;
  setShowModalUpdate: (a: boolean) => void;
  menuDetail: {};
}

interface MyAllInfoInput {
  name: string;
  iconClass: string;
  url: string;
  children: [];
}

interface MyInputSubMenu {
  title: string;
  urlSubMenu: string;
}

export default function ModalNomal(props: MyPropsModalNomal) {
  // const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  // const [defaultValueInput, setDefaultValue] = useState<any>({});
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation([]);

  /* input sub menu */
  const [inputs, setInputs] = useState<MyInputSubMenu>({
    title: "",
    urlSubMenu: "",
  });
  const [submenu, setSubmenu] = useState<any>([]);

  /* total value  */
  const [valueA, setValue] = useState<MyAllInfoInput>();

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

    setInputs((state) => ({ ...state, [nameInput]: valueInput })); //
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

  /*  clear */
  const handleClearModalAddSubMenu = () => {
    setSubmenu([]);
  };

  const handleCancel = () => {
    props.setShowModalUpdate(false);
  };

  /* Handle submit form - Call api */
  const formRef = React.useRef<FormInstance>(null);
  const handleSubmit = () => {
    if (props.idMenu) {
      if (!valueA) {
        message.error("Hãy điền thông tin và lưu lại!", 2.5);
      } else {
        const updateMenuActionPromise = updateMenuAction(props.idMenu, valueA);
        updateMenuActionPromise(dispatch);

        props.setShowModalUpdate(false);
      }
    } else {
      message.error("miss id!", 2.5);
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

  useEffect(() => {
    // if (props.idMenu) {
    //   const dataDetailMenuPromise = getDetailMenuAction(props.idMenu);
    //   dataDetailMenuPromise(dispatch);
    //   setDefaultValue(getMenu.menuDetail);
    //   const dataDefaultInput = async () => {
    //     const { data } = await menuServices.getMenuByIdApi(props.idMenu);
    //     if (data) {
    //       setDefaultValue({
    //         name: data.name,
    //         url: data.url,
    //         iconClass: data.iconClass,
    //         children: submenu,
    //       });
    //     }
    //   };
    //   dataDefaultInput();
    // }
    // console.log(defaultValueInput, "defaultValueInput");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.idMenu /* setDefaultValue */]);

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

            {submenu ? (
              <>
                <ul>
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
                {t(`MenuAdmin.update_sub_menu`)}
              </Button>
              <Button onClick={handleClearModalAddSubMenu}>
                {t(`MenuAdmin.clear`)}
              </Button>
              <Button onClick={handleCloseModalAddSubMenu}>
                {t(`MenuAdmin.close`)}
              </Button>
            </Space>
          </>
        ) : (
          <Space style={{ paddingBottom: "17px" }}>
            <Button onClick={handleOpenModalAddSubMenu}>
              {t(`MenuAdmin.update_sub_menu`)}
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
          <>
            <Form.Item
              name="nameMenu"
              label={t(`MenuAdmin.name_menu`)}
              rules={[{ type: "string", min: 1 }]}
              // initialValue={`${defaultValueInput.name}`}
            >
              <Input
                name="nameMenu"
                placeholder={` Nhập ${t(`MenuAdmin.name_menu`)}`}
              />
            </Form.Item>
          </>

          <Form.Item
            name="urlMenu"
            label={t(`MenuAdmin.url`)}
            rules={[{ type: "string", min: 1 }]}
          >
            <Input placeholder={` Nhập ${t(`MenuAdmin.url`)}`} />
          </Form.Item>

          <Form.Item
            name="iconClass"
            label={t(`MenuAdmin.icon_class`)}
            rules={[{ type: "string", min: 1 }]}
          >
            <Input placeholder={` Nhập ${t(`MenuAdmin.icon_class`)}`} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {t(`MenuAdmin.save`)}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
