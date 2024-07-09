import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Space,
  Image,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("customers");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialData = [
    {
      key: "1",
      customerPhoto: <Avatar icon={<UserOutlined />} />,
      customerId: "001",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
    },
    {
      key: "2",
      customerPhoto: <Avatar icon={<UserOutlined />} />,
      customerId: "002",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
    },
  ];

  const [dataSource, setDataSource] = useState(initialData);

  const [sortOrder, setSortOrder] = useState({
    columnKey: null,
    order: null,
  });

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleAddCustomerSubmit = (values) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted with values:", values);

      setShowAddCustomerModal(false);
      form.resetFields();

      setLoading(false);
    }, 2000);
  };

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

  const sortByName = (a, b) => a.customerName.localeCompare(b.customerName);

  const sortByEmail = (a, b) => a.customerEmail.localeCompare(b.customerEmail);

  useEffect(() => {
    if (sortOrder.columnKey && sortOrder.order) {
      const sortedData = [...initialData].sort((a, b) => {
        if (sortOrder.columnKey === "customerId") {
          return a.customerId.localeCompare(b.customerId);
        } else if (sortOrder.columnKey === "customerName") {
          return sortOrder.order === "ascend"
            ? sortByName(a, b)
            : sortByName(b, a);
        } else if (sortOrder.columnKey === "customerEmail") {
          return sortOrder.order === "ascend"
            ? sortByEmail(a, b)
            : sortByEmail(b, a);
        }
        return 0;
      });

      setDataSource(sortedData);
    } else {
      setDataSource(initialData);
    }
  }, [sortOrder]);

  const handleHeaderClick = (columnKey) => {
    if (sortOrder.columnKey === columnKey) {
      setSortOrder({
        columnKey,
        order: sortOrder.order === "ascend" ? "descend" : "ascend",
      });
    } else {
      setSortOrder({
        columnKey,
        order: "ascend",
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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

      <Layout>
        <div className="dashboard__heading">
          <h3>{currentTab}</h3>
        </div>
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
              {dataSource.map((item) => (
                <tr key={item.key} className="table__row">
                  <td className="customer__photo">{item.customerPhoto}</td>
                  <td className="customer__id">{item.customerId}</td>
                  <td className="customer__name">{item.customerName}</td>
                  <td className="customer__email">{item.customerEmail}</td>
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
                          setSelectedCustomer(item);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        Edit
                      </Button>
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Layout>

      <Modal
        // title="Confirm Delete"
        visible={showDeleteConfirm}
        onOk={() => {
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      >
        <div className="delete_dialog">
          <UploadOutlined />
          <h2>Are you sure</h2>
          <p>
            Are you sure you want to delete {selectedCustomer?.customerName}?
          </p>
          <div className="dialog__btns">
            <Button
              className="dialog__cancel_btn"
              onClick={handleAddCustomerSubmit}
            >
              Cancel
            </Button>

            <Button
              className="dialog__delete_btn"
              onClick={handleAddCustomerSubmit}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        // title="Add New Customer"
        visible={showAddCustomerModal}
        onOk={form.submit}
        onCancel={() => {
          setShowAddCustomerModal(false);
          form.resetFields();
        }}
        okButtonProps={{
          loading: loading,
          disabled: loading,
        }}
      >
        <div className="add__customer__heading">
          <h3>Add New Customer</h3>
        </div>
        <Form form={form} layout="vertical" className="add__customer__form">
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
          <Button
            className="add__customer__btn"
            onClick={handleAddCustomerSubmit}
          >
            Add Customer
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
