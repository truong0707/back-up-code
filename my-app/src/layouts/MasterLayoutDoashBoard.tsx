import React, { useEffect, useState } from "react";
import Styles from "../page/admin/Doahboard.module.scss";
import {
  AppstoreOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../store/redux/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../component/Breadcrumb/BreadcrumbNav";

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

export default function MasterLayoutDoashBoard({ children }: any) {
  const { t } = useTranslation(["homeAdmin"]);
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
  const [collapsed /* setCollapsed */] = useState(false);
  const dispatch = useDispatch();

  const items: MenuItem[] = [
    getItem(
      <Link to={"/admin"}>{t("admin home.admin")}</Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link to={"/admin/userA"}>{t("admin home.manager_users_type")} A </Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Link to={"/admin/userB"}>{t("admin home.manager_users_type")} B</Link>,
      "3",
      <DesktopOutlined />
    ),
    getItem("Menu Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),

      getItem("Submenu", "sub3", null, [
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
      ]),
    ]),
  ];

  useEffect(() => {}, [dispatch]);

  return (
    <>
      {getUser ? (
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
                {children}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{/* <Navbar /> */}</>
      )}
    </>
  );
}
