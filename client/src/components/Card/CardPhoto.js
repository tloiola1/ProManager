import React from "react";
import "./Card.css"

export const CardPhoto = ({ children }) =>
<div className="card-photo col-sm-12">
    <img src={ children } alt="Property"></img>
</div>;