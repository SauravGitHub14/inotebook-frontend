import React from "react";
import "../css/notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">

      <div className="notfound-content">

        <h1 className="error-code">404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="home-btn">
          🏠 Back to Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;