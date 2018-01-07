import React from "react";

const Tenants = () =>
<div>
    <div className="fixed-top fixed-top-custom"></div>
    <header className="fixed-top">
            <div className="container">
                <div className="row">
                    <a href="/" className="logo col-lg-4 col-md-6 col-sm-6 col-logo">
                        <div className="proManager">
                            <div className="fa fa-home fa-5x"></div>
                            <br></br>
                            <strong>ProManager</strong>
                        </div>
                    </a>
                    <div className="nav-buttons col-lg-8 col-md-6 col-sm-6 col-buttons">
                            <img id="user-pic" src="assets/images/apt1.jpg" alt="MyImage"></img>
                            <span><strong> Hello Tarciso |</strong></span>
                            <a href="/"><strong> Log Off</strong></a>
                    </div>
                </div>
            </div>
    </header>

    <div className="margin-top"></div>
    
    <div className="find-a-home"></div>
        <a href="/findproperty" className="btn btn-large-success">Find a new home.</a>
</div>

export default Tenants;