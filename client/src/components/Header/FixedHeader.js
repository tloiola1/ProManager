import React from "react";
import "../CSS/Style.css";

export const FixedHeader = ({ fluid, children }) =>
  <div className={`fixed-top`}>
    {children}
  </div>;