import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMenuAction,
  getMenuAction,
} from "../../../store/redux/actions/menuActions";
import { StateStore } from "../../../store/redux/Store";
import {
  DownOutlined,
  ScissorOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Tree } from "antd";
import ModalUpdate from "../../../component/admin/menu/modal/ModalUpdate";

export default function DeleteMenu() {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const { menuDetail } = getMenu;
  const dispatch = useDispatch();

  const [idMenu, setIdMenu] = useState<any>();

  /* modal update */
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleShowModalUpdate = (id: number | string) => {
    setShowModalUpdate(true);
    setIdMenu(id);
  };

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const handleClickDelete = (id: string | number) => {
    alert("Có chắc muốn xóa");

    const deleteMenuPromise = deleteMenuAction(id);
    deleteMenuPromise(dispatch);
  };

  const getListDataMenu = listDataMenu.map((data: any) => {
    return {
      title: (
        <>
          <DeleteOutlined
            style={{ color: "red", marginRight: "10px" }}
            onClick={() => handleClickDelete(data.id)}
          />
          <ScissorOutlined
            style={{ color: "#1677FF", marginRight: "10px" }}
            onClick={() => handleShowModalUpdate(data.id)}
          />

          <b>{data.name}</b>
        </>
      ),
      key: data.id,
      icon: <SmileOutlined />,
      children: data.children.length > 0 ? data.children : [],
    };
  });

  return (
    <>
      <ModalUpdate
        titleModal="Update Menu"
        showMoal={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        idMenu={idMenu}
        menuDetail={menuDetail}
      />

      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
        treeData={getListDataMenu}
      />
    </>
  );
}
