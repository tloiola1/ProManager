import React from "react";
import "./Custom.css";

export const InverseButton = ({ toggle, target, children }) =>
<button data-toggle={toggle.split(" ").map(toggle => toggle).join(" ")} data-target={target.split(" ").map(target => target).join(" ")} className="btn btn-outline-primary"><strong>
    {children}
</strong>
</button>;