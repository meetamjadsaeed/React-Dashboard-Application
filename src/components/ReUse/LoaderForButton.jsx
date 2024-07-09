import React from "react";
import { BeatLoader } from "react-spinners";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoaderForButton = () => {
  return <BeatLoader color="#ffffff" cssOverride={CSSProperties} />;
};

export default LoaderForButton;
