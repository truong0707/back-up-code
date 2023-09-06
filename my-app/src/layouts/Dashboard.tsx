import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Styles from "../page/admin/Doahboard.module.scss";
import {
  AppstoreOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../store/redux/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMenuAction } from "../store/redux/actions/menuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkIcons } from "../untils/checkIcons";
import { childrenData } from "../component/tree/TreeMenu";
import { PlusSquareOutlined, SettingFilled } from "@ant-design/icons";
import LoadingCpn from "../component/spin/LoadingCpn";

const TreeMenu = lazy(() => import("../component/tree/TreeMenu"));
const BreadcrumbNav = lazy(
  () => import("../component/Breadcrumb/BreadcrumbNav")
);

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Dashboard = () => {
  const { t } = useTranslation(["homeAdmin"]);
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
  const getMenu = useSelector((state: StateStore) => state);
  const [collapsed] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = true;

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const showChildtreeMenu = (children: childrenData[] | undefined): any[] => {
    if (!children || children.length === 0) {
      return [];
    }

    return children.map((childMenu: childrenData) => {
      return getItem(
        <Link className="link" to={`/admin${childMenu.url}`}>
          {childMenu.title}
        </Link>,
        `${childMenu.id}`,
        null,
        showChildtreeMenu(childMenu.children)
      );
    });
  };

  const ItemDataMenu = () => {
    const result = getMenu.MenuAdmin.listDataMenu.map(
      (dataMenu: {
        iconClass: string;
        name: string;
        id: number;
        children: [];
        url: string;
      }) => {
        return getItem(
          <Link className="link" to={`/admin${dataMenu.url}`}>
            <FontAwesomeIcon
              icon={checkIcons(dataMenu.iconClass)}
              style={{ marginRight: "10px" }}
            />
            {dataMenu.name}
          </Link>,
          `${dataMenu.id}`,
          null,
          showChildtreeMenu(dataMenu.children)
        );
      }
    );

    return result;
  };

  /* Menu */
  const items: MenuItem[] = [
    getItem(
      <Link to={"/admin/home"}>{t("adminHome.admin")}</Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link to={"/admin/managerUserA"}>
        {t("adminHome.manager_users_type")} A
      </Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Link to={"/admin/managerUserB"}>
        {t("adminHome.manager_users_type")} B
      </Link>,
      "3",
      <DesktopOutlined />
    ),
    getItem(
      <Space>{t(`MenuAdmin.menu_dynamic`)}</Space>,
      "4",
      <AppstoreOutlined />,

      ItemDataMenu()

      // [
      //   getItem("Option 9", "9"),
      //   getItem("Submenu", "sub3", null, [
      //     getItem(<><Link to={'đa'}>sáda</Link></>, "11"),
      //     getItem("Option 12", "12"),
      //   ]),
      // ]
    ),
  ];

  return (
    <Suspense fallback={<LoadingCpn />}>
      {getUser ? (
        <>
          {isAdmin ? (
            <>
              <div className={Styles.wrapperDoashBoard}>
                <div className={Styles.menuDoashBoard}>
                  <div id="scrollableDiv" className={Styles.ScrollBar}>
                    <Menu
                      defaultSelectedKeys={["1"]}
                      defaultOpenKeys={["sub1"]}
                      mode="inline"
                      theme="light"
                      inlineCollapsed={collapsed}
                      items={items}
                    />
                  </div>

                  <div className={Styles.BoxMenu}>
                    <Space>
                      <p className={Styles.titleMenu}>Manager menu</p>
                      <Link to={"/admin/add-menu"}>
                        <Tooltip title="Add new Menu">
                          <PlusSquareOutlined />
                        </Tooltip>
                      </Link>

                      <Link to={"/admin/delete&update-menu"}>
                        <Tooltip title="Delete/Update Menu">
                          <SettingFilled spin />
                        </Tooltip>
                      </Link>
                    </Space>
                    <TreeMenu />
                  </div>
                </div>

                <div className={Styles.wrapperCRUDUser}>
                  <div className={Styles.cushion}></div>
                  {/* CRUD USER */}
                  <div className={Styles.wrapperContentDoashBoard}>
                    <BreadcrumbNav />
                    <Outlet />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>Bạn không có quyền!</>
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </Suspense>
  );
};
export default Dashboard;
