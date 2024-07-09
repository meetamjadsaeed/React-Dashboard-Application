import React from "react";
import { Modal, Form } from "antd";

const GlobalModal = ({
  children,
  visibleState,
  onOkHandler,
  onCancelhandler,
  title = "",
  loading = false,
  isForm = false,
  form,
}) => {
  return (
    <>
      <Modal
        title={title}
        visible={visibleState}
        onOk={() => {
          onOkHandler(false);
        }}
        onCancel={() => {
          onCancelhandler(false);
          isForm && form.resetFields();
        }}
        okButtonProps={{
          loading: loading,
          disabled: loading,
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default GlobalModal;
