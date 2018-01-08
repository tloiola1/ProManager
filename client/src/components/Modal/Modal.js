import React from "react";

export const Modal = ({ id, children }) =>
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            { children }
        </div>
    </div>;