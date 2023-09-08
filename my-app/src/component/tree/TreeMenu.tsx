import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { getMenuAction } from "../../store/redux/actions/menuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../untils/checkIcons";
import Styles from "./TreeMenu.module.scss";

export interface childrenData {
  id: number | string;
  title: string;
  url: string;
  children?: [];
}

const TreeMenu: React.FC = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();
  const handleClick = (id: number | string) => {};

  const showChildtreeMenu = (children: childrenData[] | undefined): any[] => {
    if (!children || children.length === 0) {
      return [];
    }

    return children.map((childMenu: childrenData) => {
      return {
        title: (
          <p key={childMenu.id} onClick={() => handleClick(childMenu.id)}>
            {childMenu.title}
          </p>
        ),
        key: childMenu.id,
        children: showChildtreeMenu(childMenu.children),
      };
    });
  };

  const getListDataMenu = listDataMenu.map(
    (data: {
      id: string | number;
      name: string;
      url: string;
      iconClass: string;
      children: [];
    }) => {
      return {
        title: (
          <Link
            key={data.id}
            className="link"
            to={`/admin/DetailMenu/${data.id}`}
          >
            <b style={{ color: "#000", fontWeight: "500" }}>{data.name}</b>
          </Link>
        ),
        key: data.id,
        icon: (
          <p key={data.id}>
            <FontAwesomeIcon
              className={Styles.iconStyle}
              icon={checkIcons(data.iconClass)}
            />
          </p>
        ),
        children: showChildtreeMenu(data.children),
      };
    }
  );

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  return (
    <div id="scrollableDiv" className={Styles.ScrollBar}>
      <Tree
        className={Styles.treeData}
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
        treeData={getListDataMenu}
      />
    </div>
  );
};

export default TreeMenu;
