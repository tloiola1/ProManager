import React, { Component } from "react";
import {Body} from "../../components/Body";
import { Col, Container, Row } from "../../components/Grid";
import { FixedHeader } from "../../components/Header";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "../../components/Modal";
import { Card,CardPhoto,CardTitle,CardSubtitle,CardText,CardBlock} from "../../components/Card";
import { InverseButton, Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import {Input, FormBtn, TextArea } from "../../components/Form";
import { Span, Margin } from "../../components/Tag";
import { NavButton } from "../../components/Nav";
import { Name } from "../../components/Name";
import PROP from "../../utils/PROP";
import USER from "../../utils/USER";
import PROS from "../../utils/PROS";

class Manager extends Component {

    state = {
        pros: [],
        properties: [],
        name: "",
        Name: "",
        address1: "",
        city: "",
        state: "",
        zipcode: "",
        description: "",
        type: "",
        available: "",
        phone: "",
    };
    componentDidMount() {
        this.loadUserInfo();
        this.loadUserData(sessionStorage.getItem("id"));
        // this.loadProperties(sessionStorage.getItem("id"));
    };
    loadUserInfo = (id) => {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({name: sessionStorage.getItem("name")});
        }
    }
    loadUserData = (id) =>{
        PROP
            .getAllProperties()
            .then(res => {
                console.log("loadProperty"); console.log(res.data);
                this.setState({
                    properties: res.data
                });
            })
            .catch(err => console.log(err));
        PROS
            .getAllPros()
            .then(res => {
                this.setState({
                    pros: res.data,
                });
                console.log(this.state.pros);
            })
            .catch(err => console.log(err));
    };

    handleInputName = (event) =>  this.setState({ Name: event.target.value });
    handleAddress1 = (event) => this.setState({ address1: event.target.value });
    handleCity = (event) => this.setState({ city: event.target.value });
    handlePhone = (event) => this.setState({ phone: event.target.value });
    handleState = (event) => this.setState({  state: event.target.value });
    handleZipCode = (event) => this.setState({ zipcode: event.target.value });
    handleDescription = (event) => this.setState({ description: event.target.value });
    handlePropertyType = (event) => this.setState({ type: event.target.value })
    handleAvailability = (event) => this.setState({ available: event.target.value });

    handleFormAddProperty = event => {
        //The Suites at ATL 2212 Peachtree Rd Atlanta GA 30519 This is a great location for GA Tech students. Catch the Buzz to school just around the corner. true
        if (this.state.Name && this.state.address1 && this.state.city && this.state.state && this.state.zipcode && this.state.description && this.state.type && this.state.available) 
        {
            PROP
                .postProperty({
                    propertyname: this.state.Name, 
                    address: {
                        address1: this.state.address1, 
                        city: this.state.city,
                        state: this.state.state,
                        zipcode: this.state.zipcode
                    },
                    description: this.state.description,
                    type: this.state.type,
                    available: this.state.available,
                    foreignkey: sessionStorage.getItem("id")
                })
                .then(res => window.location.reload())
                .catch(err => console.log(err));
        }
    };
    handleFormAddPros = event => {
        //Mark Plumber 1221 qwertyuiop street 1234567890
        if (this.state.Name && this.state.address1 && this.state.phone) {
            PROS
                .postPros({
                    name: this.state.Name, 
                    address: this.state.address1,
                    phone: this.state.phone,
                    foreignkey: sessionStorage.getItem("id")
                })
                .then(res => window.location.reload())
                .catch(err => console.log(err));
        } 
    };
    handleProcess = event => {
        const id = event.target.value;
        console.log(id);
    }
    render() {
        return (
            <Body>
                <div className="fixed-top fixed-top-custom"></div>
                <FixedHeader>
                    <Container>
                        <Row>
                            <Logo/>
                            <NavButton>
                                    <Span>
                                        <strong> 
                                            Hello <Name>{this.state.name}</Name>
                                        </strong>
                                    </Span>
                                    <a id="logoff" href="/"><strong> | Log Off</strong></a>
                            </NavButton>
                        </Row>
                    </Container>
                </FixedHeader>
                <Margin/>
                {/* Add Property Modal */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="AddPropertyModal"
                    aria-hidden="true"
                    id="addProperty">
                    <Modal>
                        <ModalHeader>Add Property</ModalHeader>
                        <ModalBody>
                            Name the Property
                            <Input
                                type="text"
                                value={this.state.Name}
                                onChange={this.handleInputName}
                                name="name"
                                placeholder=""/>
                            Address
                            <Input
                                type="text"
                                value={this.state.address1}
                                onChange={this.handleAddress1}
                                name="address1"
                                placeholder=""/>
                            City
                            <Input
                                type="text"
                                value={this.state.city}
                                onChange={this.handleCity}
                                name="city"
                                placeholder=""/>
                            State
                            <Input
                                type="text"
                                value={this.state.state}
                                onChange={this.handleState}
                                name="state"
                                placeholder=""/>
                            ZipCode
                            <Input
                                type="text"
                                value={this.state.zipcode}
                                onChange={this.handleZipCode}
                                name="zipcode"
                                placeholder=""/>
                            Describe the Property
                            <TextArea
                                type="textarea"
                                rows="4" 
                                value={this.state.description}
                                onChange={this.handleDescription}
                                name="description"
                                placeholder=""/>
                            <hr></hr>
                            <div
                                className="col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    name= "property-radio"
                                    value= "home"
                                    onChange={this.handlePropertyType}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                This is a Home for Rental.
                            </div>
                            <div
                                className="divRadio col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    name= "property-radio"
                                    value= "office"
                                    onChange={this.handlePropertyType}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                This is a Bussiness Office for Rental.
                            </div>
                            <hr></hr>
                            <div
                                className="col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    name= "available-radio"
                                    value= "true"
                                    onChange={this.handleAvailability}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                This Location is Available for Rent.
                            </div>
                            <div
                                className="col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    name= "available-radio"
                                    value= "false"
                                    onChange={this.handleAvailability}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                This Location is <span style={{color: "red"}}>Not</span> Available for Rent.
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.handleFormAddProperty}>
                                Submit
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* ------------------ */}
                {/*   Add Pros Modal   */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="AddPros"
                    aria-hidden="true"
                    id="addPros">
                    <Modal>
                        <ModalHeader>Add Service Provider</ModalHeader>
                        <ModalBody>
                            Name
                            <Input
                                type="text"
                                value={this.state.Name}
                                onChange={this.handleInputName}
                                name="name"
                                placeholder="E.g. 'Mark, Plumber' or 'Handyman'"/>
                            Address
                            <Input
                                type="text"
                                value={this.state.address1}
                                onChange={this.handleAddress1}
                                name="address1"
                                placeholder=""/>
                            Phone
                            <Input
                                type="text"
                                value={this.state.phone}
                                onChange={this.handlePhone}
                                name="phone"
                                placeholder=""/>
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.handleFormAddPros}>
                                Submit
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* ------------------ */}
                {/*   Contact MOdal    */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="Contact"
                    aria-hidden="true"
                    id="contact">
                    {this.state.pros.length
                        ? (
                            <span>
                                {this
                                    .state
                                    .pros
                                    .map(providers => (
                                        <Modal key={providers._id}>
                                            <ModalHeader>
                                                <strong>
                                                    {providers.name}
                                                </strong>
                                            </ModalHeader>
                                            <ModalBody>
                                                <strong>
                                                    Address: {providers.address}
                                                </strong>
                                                <hr></hr>
                                                <strong>
                                                    Phone: {providers.phone}
                                                </strong>
                                            </ModalBody>
                                            <ModalFooter>
                                                <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </FormBtn>
                                                <FormBtn className="btn btn-info" value={providers._id} onClick={this.handleProcess}>
                                                Edit
                                                </FormBtn>
                                                <FormBtn className="btn btn-danger" value={providers._id} onClick={this.handleProcess}>
                                                Delete
                                                </FormBtn>
                                            </ModalFooter>
                                        </Modal>
                                    ))}
                            </span>
                        )
                        : (
                            <h3>Add Some Contacts Here</h3>
                        )}
                    </div>
                {/* ------------------ */}
                <Container>
                    <Row className="justify-content-between">
                    {/* Load Existing Properties Related to User Id */}
                    <Col size="lg-8 md-9 sm-12">
                    {this.state.properties.length
                        ? (
                            <span>
                                {this
                                    .state
                                    .properties
                                    .map(property => (
                                        <Card key={property._id}>
                                            <Container>
                                                <Row>
                                                    <Col size="md-4">
                                                        <CardPhoto>
                                                            {property.photo}
                                                        </CardPhoto>
                                                    </Col>
                                                    <Col size="md-5">
                                                        <CardBlock>
                                                            <CardTitle>
                                                                <strong>
                                                                    {property.propertyname}
                                                                </strong>
                                                            </CardTitle>
                                                            <CardSubtitle>
                                                                <strong>
                                                                    {property.address.address1}
                                                                    , {property.address.city}
                                                                    , {property.address.state}
                                                                    , {property.address.zipcode}
                                                                </strong>
                                                            </CardSubtitle>
                                                            <CardText>
                                                                <strong>
                                                                    {property.description}
                                                                </strong>
                                                            </CardText>
                                                        </CardBlock>
                                                    </Col>
                                                    <Col size="md-3 sm-12">
                                                        <FormBtn className="btn btn-info col-sm-12" value={property._id} onClick={this.handleEdit}>
                                                        Edit
                                                        </FormBtn>
                                                        <FormBtn className="btn btn-danger col-sm-12" value={property._id} onClick={this.handleDelete}>
                                                        Delete
                                                        </FormBtn>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card>
                                    ))}
                            </span>
                        )
                        : (
                            <h3>Add a Property Here</h3>
                        )}
                    </Col>
                    {/* My Add Buttons */}
                    <Col size="lg-4 md-3 sm-12"> 
                        <InverseButton toggle="modal" target="#todo">
                           ToDo
                        </InverseButton>
                        <InverseButton toggle="modal" target="#MyPros">
                           My Pros
                        </InverseButton>
                        <InverseButton toggle="modal" target="#SearchNewHome">
                            Find New Home
                        </InverseButton>
                    </Col>
                    </Row>
                </Container>
            </Body>
        );
    }
}
export default Manager;