import React from "react";
import { BounceLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoaderForApi = ({ lines = 10 }) => {
  return <Skeleton count={lines} />;
};

export default LoaderForApi;
