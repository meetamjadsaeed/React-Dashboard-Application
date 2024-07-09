import { Button, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import Pagination from "./ReUse/Pagination";
import CustomerDetail from "./CustomerDetail";
import ReUse from "../services/helpers/reUse";

const DashboardBody = ({ propsData }) => {
  const {
    sortOrder,
    dataSource,
    setShowDeleteConfirm,
    setSelectedCustomer,
    apiData,
    setCurrentPage,
    currentPage,
    loading,
    handleHeaderClick,
  } = propsData || {};

  const paginationProps = {
    apiData: apiData,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
  };

  return (
    <Content style={{ margin: "16px" }}>
      <table
        style={{
          width: "max-content",
          borderCollapse: "separate",
          borderSpacing: "0rem 1rem",
        }}
      >
        <thead>
          <tr>
            <th className="column__name">Customer Photo</th>
            <th
              onClick={() => handleHeaderClick("customerId")}
              style={{ cursor: "pointer" }}
              className="column__name"
            >
              Customer ID
            </th>
            <th
              onClick={() => handleHeaderClick("customerName")}
              style={{ cursor: "pointer" }}
              className="column__name"
            >
              Customer Name
              {sortOrder.columnKey === "customerName" && (
                <span>{sortOrder.order === "ascend" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              onClick={() => handleHeaderClick("customerEmail")}
              style={{ cursor: "pointer" }}
              className="column__name"
            >
              Customer Email
              {sortOrder.columnKey === "customerEmail" && (
                <span>{sortOrder.order === "ascend" ? "▲" : "▼"}</span>
              )}
            </th>
            <th className="column__name">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ReUse.mapItems(loading, apiData, CustomerDetail)}
          </tbody>
      </table>

      <Pagination paginationProps={paginationProps} />
    </Content>
  );
};

export default DashboardBody;
