import React from "react";

const DashboardHeading = ({ currentTab }) => {
  return (
    <div className="dashboard__heading">
      <h3>{currentTab}</h3>
    </div>
  );
};

export default DashboardHeading;
