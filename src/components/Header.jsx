import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const DashboardHeader = ({ handleAddCustomer }) => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          margin: "16px",
          backgroundColor: "#369172",
          color: "#fff",
        }}
        onClick={handleAddCustomer}
      >
        Add New Customer
      </Button>
    </Header>
  );
};

export default DashboardHeader;
