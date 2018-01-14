import React from "react";

export const ModalButton = props =>
<button type="button" className="btn" { ...props }>
    {props.children}
</button>