import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Styles from "../page/admin/Doahboard.module.scss";
import {
  AppstoreOutlined,
  DesktopOutlined,
  PieChartOutlined,
  PlusSquareOutlined,
  ScissorOutlined,
  SettingFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../store/redux/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../component/Breadcrumb/BreadcrumbNav";
import { getMenuAction } from "../store/redux/actions/menuActions";

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
  const isAdmin = true; // check dữ liệu admin từ server

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const ItemDataMenu = () => {
    /* sub menu */
    const renderSubMenu = (subMenu: any) => {
      if (subMenu.length > 0) {
        const dataSubMenu = subMenu.map(
          (data: { id: number; title: string }) => {
            return getItem(`${data.title}`, `${data.id}`);
          }
        );
        return dataSubMenu;
      } else {
        return null;
      }
    };

    /* main menu */
    const result = getMenu.MenuAdmin.listDataMenu.map(
      (dataMenu: { name: string; id: number; children: [] }) => {
        return getItem(
          `${dataMenu.name}`,
          `${dataMenu.id}`,
          null,
          renderSubMenu(dataMenu.children)
        );
      }
    );

    return result;
  };

  /* Menu */
  const items: MenuItem[] = [
    getItem(
      <Link to={"/admin/home"}>{t("admin home.admin")}</Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link to={"/admin/managerUserA"}>
        {t("admin home.manager_users_type")} A{" "}
      </Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Link to={"/admin/managerUserB"}>
        {t("admin home.manager_users_type")} B
      </Link>,
      "3",
      <DesktopOutlined />
    ),
    getItem(
      <Space>
        Menu Dynamic
        <Link to={"/admin/add-menu"}>
          <Tooltip title="Add new Menu">
            <PlusSquareOutlined />
          </Tooltip>
        </Link>
        <Link to={"/admin/delete&update-menu"}>
          <Tooltip title="Delete/Update Menu">
            <SettingFilled spin /* rotate={180} */ />
          </Tooltip>
        </Link>
      </Space>,
      "sub2",
      <AppstoreOutlined />,

      ItemDataMenu()
      // [
      //   getItem("Option 9", "9"),
      //   getItem("Submenu", "sub3", null, [
      //     getItem("Option 11", "11"),
      //     getItem("Option 12", "12"),
      //   ]),
      // ]
    ),
  ];

  return (
    <>
      {getUser ? (
        <>
          {isAdmin ? (
            <>
              <div className={Styles.wrapperDoashBoard}>
                <div className={Styles.menuDoashBoard}>
                  <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                  />
                </div>

                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "21%" }}></div>
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
    </>
  );
};
export default Dashboard;