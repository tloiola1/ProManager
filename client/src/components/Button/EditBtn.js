import React from "react";

export const EditBtn = ({ toggle, target, children }) =>
<button  data-toggle={toggle.split(" ").map(toggle => toggle).join(" ")} data-target={target.split(" ").map(target => target).join(" ")} className="btn btn-outline-info"{...children}>
    {children}
</button>
