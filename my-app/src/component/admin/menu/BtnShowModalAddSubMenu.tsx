import React, { Suspense, useEffect, useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../spin/LoadingCpn";
import { addSubMenuAction } from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import { addChildToMenu, addChildToParentById } from "../../../untils/addDataSub";

export interface MyInputSubMenu {
  title: string;
  url: string;
  children: [];
}

interface MyBtnShowMenuSubProps {
  idSubMenu?: string;
  menuDetail?: {
    id: number | number,
    name: string,
    url: string,
    iconClass: string,
    children: [],
  }[];
  listDataMenu: [];
  idMenu: string;
  contenBtn?: string,
  parentType?: boolean,
}

const BtnShowModalAddSubMenu = (props: MyBtnShowMenuSubProps) => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { menuDetail } = getMenu;
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    }));
  };

  /* Handle submit form - Call api */
  const handleOk = () => {
    const idMenu = parseInt(props.idMenu);

    /* check input empty */
    if (inputs.title === '') {
      message.error("Hãy điền name cho sub menu!", 3);
    } else if (inputs.url === '') {
      message.error("Hãy điền url cho sub menu!", 3);
    } else {
      /* add sub menu */
      if (menuDetail && menuDetail.children) {
        if (props.idSubMenu) {
          const idMenuSub = parseInt(props.idSubMenu);
          let resultAddSub = addChildToParentById(props.listDataMenu, idMenuSub, inputs);
          // eslint-disable-next-line array-callback-return
          const newData = resultAddSub.filter((menu) => {
            if (menu.id === idMenu) {
              return menu;
            }
          });
          const addSubMenuActionPromise = addSubMenuAction(idMenu, newData[0]);
          addSubMenuActionPromise(dispatch);
        } else {
      
        }
        
        if (props.parentType) {
          let resultAddSub = addChildToMenu(props.listDataMenu, idMenu, inputs);
          const addSubMenuActionPromise = addSubMenuAction(idMenu, resultAddSub);
          addSubMenuActionPromise(dispatch);
        }

      }


    }
    setIsModalOpen(false);
  };
  /* handle Cancel */
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => { }, [dispatch]);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {
          props.contenBtn ? <>
            {props.contenBtn}
          </> : <PlusOutlined />
        }
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
              name="title"
              onChange={handleInputChangeSubMenu}
              placeholder="name Menu"
            />

            <h4>url</h4>
            <Input
              name="url"
              defaultValue={"/"}
              onChange={handleInputChangeSubMenu}
              placeholder="url"
            />
          </div>
        </Suspense>
      </Modal>
    </>
  );
};

export default BtnShowModalAddSubMenu;
