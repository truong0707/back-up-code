import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const BreadcrumbNav: React.FC = () => (
  <Breadcrumb style={{ marginBottom: '10px' }}
    items={[
      // {
      //   href: '',
      //   title: <HomeOutlined />,
      // },
      {
        // href: '',
        title: (
          <Link to={"/admin/"}>
            <HomeOutlined />
          </Link>
        ),
      },
      {
        title: (
          <Link to={"/admin/userA"}>
            <span>ManagerA</span>
          </Link>
        ),
      },
      {
        title: (
          <Link to={"/admin/userB"}>
            <span>ManagerB</span>
          </Link>
        ),
      },
    ]}
  />
);

export default BreadcrumbNav;
