import React from "react";
// import { notFound } from "../../constants";
import notFound from "../../assets/img/reuse/notFound.svg";

const NoRecord = () => {
  const CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="notFound-container" style={CSSProperties}>
      <img
        src={notFound}
        alt="not found"
        className="image-fluid"
        width={150}
        height={150}
      />
      <p className="mt-4">No Record Found</p>
    </div>
  );
};

export default NoRecord;
