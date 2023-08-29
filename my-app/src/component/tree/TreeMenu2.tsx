import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { getMenuAction } from "../../store/redux/actions/menuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../untils/checkIcons";

const TreeMenu2: React.FC = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();

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
            <Link to={`/admin${data.url}`}>
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
        // children: logChildren(data.children),

        children:
          data.children.length > 0
            ? data.children.map((data: any) => data)
            : [],
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
