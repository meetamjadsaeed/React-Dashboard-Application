// import { CRUDActions } from "../redux/slices/customersCRUD.slice";
import { Button, Form, Image, Space, message } from "antd";
import React, { useState } from "react";
import GlobalModal from "./ReUse/Modals/GlobalModal";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import ReUse from "../services/helpers/reUse";
import { useDispatch } from "react-redux";

const CustomerDetail = (propsData) => {
   const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { avatar, email, first_name, id, last_name } = propsData || {};

  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    },
    maxCount: 1,
    accept: ".jpg,.jpeg,.png",
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      handleEditCustomerSubmit(values);
    });
  };

  const handleEditCustomerSubmit = (values) => {
    setSubmitLoading(true);

    setTimeout(() => {
      const { customerEmail, customerName, customerPhoto } = values || {};

      const payLoad = {
        id: propsData?.id,
        first_name: customerName || propsData?.first_name,
        last_name: customerName || propsData?.first_name,
        email: customerEmail || propsData?.email,
        avatar: JSON.stringify(customerPhoto?.file || propsData?.avatar),
      };

      // dispatch(CRUDActions.UpdateItem(payLoad));

      setShowAddCustomerModal(false);
      form.resetFields();

      setSubmitLoading(false);
    }, 2000);
  };

  const handleDeleteCustomerSubmit = () => {
    const payLoad = propsData?.id;
    // dispatch(CRUDActions.RemoveItem(payLoad));
  };

  return (
    <>
      <tr key={id} className="table__row">
        <td className="customer__photo">
          <img
            src={avatar}
            alt="HappyFace"
            width="150"
            height="150"
            onError={ReUse.onImageError}
          />
        </td>
        <td className="customer__id">{id}</td>
        <td className="customer__name">{first_name}</td>
        <td className="customer__email">{email}</td>
        <td>
          <Space size="middle">
            <Button
              style={{
                backgroundColor: "#B0E1B7",
                color: "#279737",
              }}
            >
              Edit
            </Button>
            <Button
              style={{
                backgroundColor: "#EF9999",
                color: "#DF3030",
              }}
              onClick={() => {
                setSelectedCustomer(propsData);
                setShowDeleteConfirm(true);
              }}
            >
              Delete
            </Button>
          </Space>
        </td>
      </tr>

      {/* Update Customer   */}
      <GlobalModal
        visibleState={showAddCustomerModal}
        onOkHandler={setShowAddCustomerModal}
        isForm={true}
        form={form}
        loading={loading}
      >
        <UpdateCustomer
          handleAddCustomerSubmit={onFinish}
          uploadProps={uploadProps}
          form={form}
        />
      </GlobalModal>

      {/* Delete Customer  */}
      <GlobalModal
        visibleState={showDeleteConfirm}
        onOkHandler={handleDeleteCustomerSubmit}
        onCancelHandler={showDeleteConfirm}
      >
        <DeleteCustomer
          onOkHandler={handleDeleteCustomerSubmit}
          onCancelHandler={setShowDeleteConfirm}
          selectedCustomer={selectedCustomer}
        />
      </GlobalModal>
    </>
  );
};

export default CustomerDetail;
