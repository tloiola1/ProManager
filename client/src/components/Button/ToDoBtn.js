import React from "react";

export const ToDoBtn = props =>
<button {...props} className="btn btn-outline-danger">
{props.children}
</button>