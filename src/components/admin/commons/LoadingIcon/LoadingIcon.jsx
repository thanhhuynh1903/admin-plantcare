import React from "react";
import loadingIcon from "@assets/loading_icon.gif";
import "./LoadingIcon.scss";

const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={loadingIcon} alt="loading" />
    </div>
  );
};

export default LoadingIcon;
