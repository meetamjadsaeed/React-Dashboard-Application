import React from "react";
import { BounceLoader } from "react-spinners";

const ObjBasedApiDataLoader =
  (Component) =>
  ({ loading, data, ...props }) => {
    if (loading) {
      return <LoaderForApi />;
    } else if (Object.keys(data)?.length === 0) {
      return <NoRecord />;
    } else {
      return <Component data={data} {...props} />;
    }
  };

export default ObjBasedApiDataLoader;
