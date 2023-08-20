import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Styles from "./Breadcrumb.module.scss";

const BreadcrumbNav: React.FC = () => (
  <Breadcrumb
    className={Styles.breadcrumb}
    items={[
      {
        // href: '',
        title: (
          <Link to={"/admin/home"}>
            <HomeOutlined />
          </Link>
        ),
      },
      {
        title: (
          <Link to={"/admin/managerUserA"}>
            <span>A</span>
          </Link>
        ),
      },
      {
        title: (
          <Link to={"/admin/managerUserB"}>
            <span>B</span>
          </Link>
        ),
      },
    ]}
  />
);

export default BreadcrumbNav;
