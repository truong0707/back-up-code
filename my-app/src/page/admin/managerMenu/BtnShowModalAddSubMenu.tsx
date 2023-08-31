import React, { Suspense, useEffect, useState } from "react";
import { Button, Input, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../../component/spin/LoadingCpn";
import {
  addSubMenuAction,
  getDetailMenuAction,
  updateFieldMenuAction,
} from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import { addChildToParentById } from "../../../untils/addDataSub";
import { useLocation } from "react-router-dom";

interface MyInputSubMenu {
  title: string;
  url: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  id: string;
  menuDetail?: any;
  listDataMenu: any;
  idMenu: number | string;
}

const BtnShowModalAddSubMenu = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  const { menuDetail } = getMenu;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();
  const uuidV4 = uuidv4();
  const parserNumber = parseInt(uuidV4.replace(/- +/g, ""), 16);

  /* Sub menu */
  const [inputs, setInputs] = useState<MyInputSubMenu>({
    title: "",
    url: "",
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

  /* Handle submit form - Call api */
  const handleOk = () => {
    const idProps = parseInt(props.id);
    const idPath = parseInt(pathId);

    if (menuDetail && menuDetail.children) {
      let ss = addChildToParentById(props.listDataMenu, idProps, inputs);

      const abc = ss.filter((menu: { id: number }) => {
        if (menu.id === idPath) {
          return menu;
        }
      });
      const addSubMenuActionPromise = addSubMenuAction(props.idMenu, abc[0]);
      addSubMenuActionPromise(dispatch);

      ss = [];
      setInputs({
        title: "",
        url: "",
        children: [],
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
      </Button>

      <Modal
        title="Thêm mới sub menu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Suspense fallback={<LoadingCpn />}>
          <div>
            <h4>Title</h4>
            <Input
              defaultValue={inputs.title}
              name="title"
              onChange={handleInputChangeSubMenu}
              placeholder="name Menu"
            />

            <h4>url</h4>
            <Input
              name="url"
              defaultValue={inputs.title}
              onChange={handleInputChangeSubMenu}
              placeholder="url"
              // defaultValue={"/"}
            />
          </div>
        </Suspense>
      </Modal>
    </>
  );
};

export default BtnShowModalAddSubMenu;
