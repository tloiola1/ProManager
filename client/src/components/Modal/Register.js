import React from "react";

export const Register = ({ fluid, children }) =>
  <div>
    <div className="modal fade" id="register" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                </div>
                <div className="modal-body">
                    Name:
                    <br></br>
                    <input id="register-name" className="col-sm-12" type="text"></input>
                    <br></br>
                    Email:
                    <br></br>
                    <input id="register-email" className="col-sm-12" type="email"></input>
                    <br></br>
                    Password:
                    <br></br>
                    <input id="register-password" className="col-sm-12" type="password"></input>
                    <br></br>
                    <br></br>
                    <div className="col-sm-12">
                        <input type="radio" className="form-check-input" name="register-radio" id="optionsRadios1" value="rent"></input>
                        Rent a property.
                    </div>
                    <div className="col-sm-12">
                        <input type="radio" className="form-check-input" name="register-radio" id="optionsRadios2" value="manage"></input>
                        Manage a property.
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="submit-register" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>;

export default Register;