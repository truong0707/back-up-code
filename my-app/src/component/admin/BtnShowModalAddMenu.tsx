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
import { addChildToParentById } from "../../untils/addDataSub";
import { v4 as uuidv4 } from "uuid";

interface MyInputSubMenu {
  name: string;
  urlSubMenu: string;
  iconClass: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  id: string;
  menuDetail?: any;
  listDataMenu: any;
}

const BtnShowModalAddMenu = (props: MyBtnShowMenuSubProps) => {
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
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);

  /* Sub menu */
  const [inputs, setInputs] = useState<MyInputSubMenu>({
    name: "",
    urlSubMenu: "",
    iconClass: "",
    children: [],
  });

  /* handle change input sub menu */
  const handleInputChangeSubMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state: MyInputSubMenu) => ({
      ...state,
      id: parserNumber,
      [nameInput]: valueInput,
    })); //
  };

  /*  clear */
  const handleClearModalAddSubMenu = () => {
    // setSubmenu([]);
  };

  /* Handle submit form - Call api */
  const handleOk = () => {
    const idParam = parseInt(props.id);

    // if (menuDetail && menuDetail.children) {
    //   const ss = addChildToParentById(props.listDataMenu, idParam, inputs);

    //   const updateFielMenuActionPromise = updateFieldMenuAction(
    //     idParam,
    //     undefined,
    //     ss[0]
    //   );
    //   updateFielMenuActionPromise(dispatch);
    // }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm mới
      </Button>

      <Modal
        title="Thêm mới menu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Suspense fallback={<LoadingCpn />}>
          <div>
            <Space>
              <Space direction="vertical">
                <h4>Name</h4>
                <Input
                  name="name"
                  onChange={handleInputChangeSubMenu}
                  placeholder="name Menu"
                />
              </Space>

              <Space direction="vertical">
                <h4>url</h4>
                <Input
                  name="urlSubMenu"
                  onChange={handleInputChangeSubMenu}
                  placeholder="url"
                  defaultValue={"/"}
                />
              </Space>

              <Space direction="vertical">
                <h4>icon classss</h4>
                <Input
                  name="iconClass"
                  onChange={handleInputChangeSubMenu}
                  placeholder="iconClass"
                />
              </Space>
            </Space>
          </div>

          <Space /* className={Styles.wrapperBtnAdd} */>
            {/* <Button type="primary" onClick={handleClickAddSubMenu}>
              {t(`MenuAdmin.add_sub_menu`)}
            </Button> */}

            <Button
              style={{ marginTop: "10px" }}
              danger
              onClick={handleClearModalAddSubMenu}
            >
              {t(`MenuAdmin.clear`)}
            </Button>
          </Space>
        </Suspense>
      </Modal>
    </>
  );
};

export default BtnShowModalAddMenu;
