import React from "react";
import "./Card.css"

export const CardPhoto = ({ children }) =>
<div className="card-photo">
    <img src={ children } alt="Property"></img>
</div>;