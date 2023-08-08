import Navbar from "../../component/NavBar/Navbar";
import React, { useEffect, useState } from "react";
import Styles from "./Doahboard.module.scss";

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { Link } from "react-router-dom";

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

const items: MenuItem[] = [
  getItem( <Link to={"/admin/userA"}>ManagerUsersA</Link>, "1", <PieChartOutlined />),
  getItem(<Link to={"/admin/userB"}>ManagerUsersB</Link>, "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),

  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),

    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];


export default function Doashboard({ children }: any) {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {

  },[dispatch])


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

            <div
              style={{ width: "100%", display: 'flex' }}
            >
              <div style={{ width: "21%" }}>ss</div>  

              {/* CRUD USER */}
              <div style={{ width: "79%", background:'' }}>
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
