import React from "react";
import { BeatLoader } from "react-spinners";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoaderForContent = () => {
  return <BeatLoader color="#7dab3c" cssOverride={CSSProperties} />;
};

export default LoaderForContent;
