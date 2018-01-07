import React from "react";

export const Login = ({ children }) =>
  <div>
    <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                </div>
                <div className="modal-body">
                    Email:
                    <br></br>
                    <input id="login-email" className="col-sm-12" type="email"></input>
                    <br></br>
                    Password:
                    <br></br>
                    <input id="login-password" className="col-sm-12" type="password"></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="submit-sign-in" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
  </div>;

export default Login;
