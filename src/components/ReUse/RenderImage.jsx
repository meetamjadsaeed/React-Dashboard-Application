import React from "react";
import ReUse from "../../services/helpers/reUse";

const RenderImage = ({ file = {} }) => {
  const isFile = ReUse.isFile({ file: file || {} });
  return (
    <div>
      {isFile ? (
        <img
          src={file}
          className="image-fluid image-width"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
          alt=""
        />
      ) : null}
    </div>
  );
};

export default RenderImage;
