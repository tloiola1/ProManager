import React from "react";
import "./Button.css";

export const Button = ({ toggle, target, children }) =>
<button data-toggle={toggle.split(" ").map(toggle => toggle).join(" ")} data-target={target.split(" ").map(target => target).join(" ")} className="btn btn-outline-primary"><strong>
    {children} 
</strong>
</button>;