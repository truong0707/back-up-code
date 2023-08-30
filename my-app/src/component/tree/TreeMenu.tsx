import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { getMenuAction } from "../../store/redux/actions/menuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../untils/checkIcons";

export interface childrenData {
  id: number | string;
  title: string;
  url: string;
  // iconClass?: string,
  children?: [];
}

const TreeMenu2: React.FC = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();

  const handleClick = (id: number | string) => {
    console.log(id, "s");
  };

  const showChildtreeMenu = (children: childrenData[] | undefined): any[] => {
    if (!children || children.length === 0) {
      return [];
    }

    return children.map((childMenu: childrenData) => {
      return {
        title: (
          // <Link className="link" to={`/admin${childMenu.url}/${childMenu.id}`}>
          <b onClick={() => handleClick(childMenu.id)}>{childMenu.title}</b>
          // </Link>
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
      children: any;
    }) => {
      return {
        title: (
          <>
            <Link className="link" to={`/admin/DetailMenu/${data.id}`}>
              <b>{data.name}</b>
            </Link>
          </>
        ),
        key: data.id,
        icon: (
          <FontAwesomeIcon
            icon={checkIcons(data.iconClass)}
            //   className={Styles.icon}
          />
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
    <>
      <Tree
        style={{ background: "#001529", color: "#a0a3a5" }}
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
        treeData={getListDataMenu}
      />
    </>
  );
};

export default TreeMenu2;
