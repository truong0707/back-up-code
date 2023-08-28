import React, { Suspense, useEffect, useState } from "react";
import { Button, FormInstance, Input, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../spin/LoadingCpn";
import {
  getDetailMenuAction,
  updateFieldMenuAction,
} from "../../store/redux/actions/menuActions";
import { StateStore } from "../../store/redux/Store";

interface MyInputSubMenu {
  title: string;
  urlSubMenu: string;
}

interface MyBtnShowMenuSubProps {
  id: string;
}

const BtnShowMenuSub = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail } = getMenu;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);

    const dataDetailMenuPromise = getDetailMenuAction(props.id);
    dataDetailMenuPromise(dispatch);
  };

  const { t } = useTranslation(["homeAdmin"]);
  const dispatch = useDispatch();

  /* Sub menu */
  const [inputs, setInputs] = useState<MyInputSubMenu>({
    title: "",
    urlSubMenu: "",
  });

  /* handle change input sub menu */
  const handleInputChangeSubMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    const idSub = menuDetail.children.length + 1;
    setInputs((state: MyInputSubMenu) => ({
      ...state,
      id: idSub,
      [nameInput]: valueInput,
    })); //
  };

  /*  clear */
  const handleClearModalAddSubMenu = () => {
    // setSubmenu([]);
  };

  /* Handle submit form - Call api */
  const formRef = React.useRef<FormInstance>(null);

  useEffect(() => {}, [dispatch]);

  /* handle submit */
  const handleOk = () => {
    if (menuDetail) {
      const currentSubMenu: object[] = menuDetail.children;
      /* add new sub */
      currentSubMenu.push(inputs);

      console.log(currentSubMenu, "in");

      /* Update */
      const updateFieldMenuPromise = updateFieldMenuAction(
        props.id,
        currentSubMenu
      );
      updateFieldMenuPromise(dispatch);
    }

    formRef.current?.resetFields();
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm sub mới
      </Button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Suspense fallback={<LoadingCpn />}>
          <div>
            <h4 /* className={Styles.titleContent} */>
              {t(`MenuAdmin.sub_menu`)}
            </h4>

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
                  defaultValue={"/"}
                />
              </Space>
            </Space>
          </div>

          <Space /* className={Styles.wrapperBtnAdd} */>
            {/* <Button type="primary" onClick={handleClickAddSubMenu}>
              {t(`MenuAdmin.add_sub_menu`)}
            </Button> */}

            <Button danger onClick={handleClearModalAddSubMenu}>
              {t(`MenuAdmin.clear`)}
            </Button>
          </Space>
        </Suspense>
      </Modal>
    </>
  );
};

export default BtnShowMenuSub;
