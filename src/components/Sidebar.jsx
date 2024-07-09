import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

const Sidebar = ({ propsData }) => {
  const { currentTab, setCurrentTab } = propsData || {};
  return (
    <Sider
      width={300}
      style={{ backgroundColor: "#015249", padding: "20px 50px 20px 50px" }}
    >
      <div className="logo">
        <Image
          width={100}
          src="https://www.nsbpictures.com/wp-content/uploads/2019/11/logo-template-png-transparent-logo-templatepng-images-pluspng-templates-png-1655_1567.png"
        />
      </div>
      <Menu
        mode="vertical"
        theme="dark"
        selectedKeys={[currentTab]}
        onClick={({ key }) => setCurrentTab(key)}
      >
        <Menu.Item key="customers" className="tab__Item">
          Customers
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
