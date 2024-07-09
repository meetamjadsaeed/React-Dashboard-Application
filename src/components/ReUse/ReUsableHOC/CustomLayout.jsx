import React from "react";
import { Layout } from "antd";

const CustomLayout = ({ children, isStyles = true }) => {
  return (
    <>
      <Layout style={isStyles ? { minHeight: "100vh" } : undefined}>
        {children}
      </Layout>
    </>
  );
};

export default CustomLayout;
