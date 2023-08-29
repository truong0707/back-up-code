import React, { useEffect } from "react";
import {
  DownOutlined,
} from "@ant-design/icons";
import { Tree } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { getMenuAction } from "../../store/redux/actions/menuActions";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../../untils/checkIcons";

const TreeMenu: React.FC = () => {
  const getMenu = useSelector((state: StateStore) => state.MenuAdmin);
  const { listDataMenu } = getMenu;
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  const getListDataMenu = listDataMenu.map(
    (data: {
      id: string | number;
      name: string;
      iconClass: string;
      children: any;
    }) => {
      return {
        title: (
          <>
            <Link to={`/admin/DetailMenu/${data.id}`}>
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
        children: data.children.length > 0 ? data.children : [],
        
        // children: data.children.length > 0 ? (
        //   data.children.children && data.children.children.length > 0 ? data.children.children : []
        // ) : []
        // children: [
        //   {
        //     title: 'parent 1-2',
        //     key: '0-0-2',
        //     children: [
        //       {
        //         title: 'leaf',
        //         key: '0-0-2-0',
        //       },
        //       {
        //         title: 'leaf',
        //         key: '0-0-2-1',
        //       },
        //     ]
        //   }
        // ],
      };
    }
  );

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);


  return (
    <>
      {/* <p style={{ color: "pink" }}>Dynamic</p> */}
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

export default TreeMenu;
