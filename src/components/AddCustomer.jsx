import { Button, Form, Input, Upload } from "antd";
import React from "react";

import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddCustomer = ({ handleAddCustomerSubmit, uploadProps, form }) => {
  return (
    <>
      <div className="add__customer__heading">
        <h3>Add New Customer</h3>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="add__customer__form"
        onFinish={handleAddCustomerSubmit}
      >
        <Form.Item
          name="customerName"
          // label="Customer Name"
          placeholder="customer name"
          className="add__customer__input__field"
          rules={[
            {
              required: true,
              message: "Please enter the customer's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerEmail"
          // label="Customer Email"
          className="add__customer__input__field"
          rules={[
            {
              required: true,
              message: "Please enter the customer's email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerPhoto"
          // label="Upload Photo"
          rules={[
            {
              required: true,
              message: "Please upload a customer photo!",
            },
          ]}
        >
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              className="customer__upload__photo"
            >
              Upload Photo
            </Button>
          </Upload>
        </Form.Item>
        <Button className="add__customer__btn" htmlType="submit">
          Add Customer
        </Button>
      </Form>
    </>
  );
};

export default AddCustomer;
