import React from "react";

export const AddProperty = ({ children }) =>
<div>
    <div className="modal fade" id="add-property-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add a New Property</h5>
                </div>
                <div className="modal-body">
                    Property Name:
                    <br></br>
                    <input id="add-property-name" className="col-sm-12" type="text"></input>
                    <br></br>
                    Address:
                    <br></br>
                    <input id="add-property-address" className="col-sm-12" type="text"></input>
                    <br></br>
                    City:
                    <br></br>
                    <input id="add-property-city" className="col-sm-12" type="text"></input>
                    <br></br>
                    State:
                    <br></br>
                    <input id="add-property-state" className="col-sm-12" type="text"></input>
                    <br></br>
                    ZipCode:
                    <br></br>
                    <input id="add-property-zipcode" className="col-sm-12" type="text"></input>
                    <br></br>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="submit-add-property" type="button" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>;

export default AddProperty;
