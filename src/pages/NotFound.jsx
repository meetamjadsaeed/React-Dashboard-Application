import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const styles = {
    border: "5px solid #FFFFFF",
    padding: "50px",
  };

  return (
    <main>
      <div className="section not__found text-center" style={styles}>
        <h3>Page You Were Looking For Was Not Found</h3>
        <Link to="/" className="btn-bid mt-3 d-inline-block">
          Go Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
