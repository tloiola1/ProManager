import React from "react";
import "./Header.css";

export const FixedHeader = ({ fluid, children }) =>
  <div className={`fixed-top`}>
    {children}
  </div>;