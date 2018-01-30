import React from "react";
import "../CSS/Style.css"

export const CardPhoto = ({ children }) =>
<div className="card-photo">
    <img src={ children } alt="Property" style={{width: "17rem"}}  id="homePorpertyImage"></img>
</div>;