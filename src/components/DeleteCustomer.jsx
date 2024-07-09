import { Button } from "antd";
import React from "react";

import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const DeleteCustomer = ({ onOkHandler, onCancelHandler, selectedCustomer }) => {
  const { customerName } = selectedCustomer || {};
  return (
    <>
      <div className="delete_dialog">
        <UploadOutlined />
        <h2>Are you sure</h2>
        <p>Are you sure you want to delete {customerName}?</p>
        <div className="dialog__btns">
          <Button className="dialog__cancel_btn" onClick={onOkHandler}>
            Cancel
          </Button>

          <Button className="dialog__delete_btn" onClick={onOkHandler}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteCustomer;
