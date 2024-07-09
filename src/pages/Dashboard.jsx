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
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/Header";
import DashboardBody from "../components/DashboardBody";
import DashboardHeading from "../components/DashboardHeading";
import CustomLayout from "../components/ReUse/ReUsableHOC/CustomLayout";
import GlobalModal from "../components/ReUse/Modals/GlobalModal";
import DeleteCustomer from "../components/DeleteCustomer";
import AddCustomer from "../components/AddCustomer";
import UpdateCustomer from "../components/UpdateCustomer";
import ReUse from "../services/helpers/reUse";
import { useDispatch, useSelector } from "react-redux";

import AppService from "../services/appServices";
import { CRUDActions, getAllUsers } from "../redux/slices/customersCRUD.slice";

const Dashboard = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("customers");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers({ pageNumber: currentPage }));
  }, [currentPage]);

  const getCustomers = useSelector((state) => state.persistedReducer.crud);

  const { CRUDData, loading, error } = getCustomers || {};

  console.log(getCustomers, "getCustomers");

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

  const onFinish = () => {
    form.validateFields().then((values) => {
      handleAddCustomerSubmit(values);
    });
  };

  const handleAddCustomerSubmit = (values) => {
    setSubmitLoading(true);

    setTimeout(() => {
      const { customerEmail, customerName, customerPhoto } = values || {};
      const payLoad = {
        id: ReUse.generateId(),
        first_name: customerName,
        last_name: customerName,
        email: customerEmail,
        avatar: JSON.stringify(customerPhoto?.file),
      };

      dispatch(CRUDActions.AddItem(payLoad));

      setShowAddCustomerModal(false);
      form.resetFields();

      setSubmitLoading(false);
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

  const sideBarProps = {
    currentTab,
    setCurrentTab,
  };

  const dashboardBodyProps = {
    sortOrder,
    dataSource,
    setShowDeleteConfirm,
    setSelectedCustomer,
    apiData: CRUDData,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    submitLoading: loading,
    handleHeaderClick: handleHeaderClick,
  };

  console.log(getCustomers, "redux data");

  return (
    <CustomLayout>
      {/* Dashboard Sidebar  */}
      <Sidebar propsData={sideBarProps} />

      {/* Display Customers  */}
      <CustomLayout isStyles={false}>
        <DashboardHeading currentTab={currentTab} />

        <DashboardHeader handleAddCustomer={handleAddCustomer} />

        <DashboardBody propsData={dashboardBodyProps} />
      </CustomLayout>

      {/* Add Customer  */}
      <GlobalModal
        visibleState={showAddCustomerModal}
        onOkHandler={setShowAddCustomerModal}
        isForm={true}
        form={form}
        submitLoading={submitLoading}
      >
        <AddCustomer
          handleAddCustomerSubmit={onFinish}
          uploadProps={uploadProps}
          form={form}
        />
      </GlobalModal>
    </CustomLayout>
  );
};

export default Dashboard;
