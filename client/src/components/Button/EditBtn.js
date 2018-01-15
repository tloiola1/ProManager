import React, { children } from "react";

export const EditBtn = props =>
<button {...props} className="btn btn-info col-sm-12">
    {props.children}
</button>
