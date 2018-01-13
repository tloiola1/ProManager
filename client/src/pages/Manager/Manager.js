import React, { Component } from "react";
import {Body} from "../../components/Body";
import { Col, Container, Row } from "../../components/Grid";
import { FixedHeader } from "../../components/Header";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "../../components/Modal";
import { Card,CardPhoto,CardTitle,CardSubtitle,CardText,CardBlock} from "../../components/Card";
import { InverseButton } from "../../components/Button";
import { Logo } from "../../components/Logo";
import {Input, FormBtn, TextArea } from "../../components/Form";
import { Span, Margin } from "../../components/Tag";
import { NavButton } from "../../components/Nav";
import { Name } from "../../components/Name";
import API from "../../utils/API";

class Manager extends Component {

    state = {
        properties: [],
        name: "",
        _id: "",
        propertyName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        description: "",
        type: "",
        available: "",
    };
    componentDidMount() {
        this.loadName();
        this.loadProperties(sessionStorage.getItem("id"));
    };
    loadProperties = (id) => {
        API
            .getProperty(id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    properties: res.data,
                    // propertyName: "",
                    // address: "",
                    // city: "",
                    // state: "",
                    // zipcode: "",
                    // description: "",
                    // available: "",
                    // type: "",
                    //  photo: ""
                });
            })
            .catch(err => console.log(err));
    };
    loadName = (_name) => {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({name: sessionStorage.getItem("name")});
        }
    };
    handleInputName = (event) =>  this.setState({ propertyName: event.target.value });
    handleAddress = (event) => this.setState({ address: event.target.value });
    handleCity = (event) => this.setState({ city: event.target.value });
    handleState = (event) => this.setState({  state: event.target.value });
    handleZipCode = (event) => this.setState({ zipcode: event.target.value });
    handleDescription = (event) => this.setState({ description: event.target.value });
    handlePropertyType = (event) => this.setState({ type: event.target.value })
    handleAvailability = (event) => this.setState({ available: event.target.value });

    handleFormAddProperty = event => {
        //The Suites at ATL 2212 Peachtree Rd Atlanta GA 30519 This is a great location for GA Tech students. Catch the Buzz to school just around the corner. true
        if (this.state.propertyName && this.state.address && this.state.city && this.state.state && this.state.zipcode && this.state.description && this.state.type && this.state.available) {
            API
                .postProperty({
                    _id: sessionStorage.getItem("id"),
                    propertyName: this.state.propertyName, 
                    address: this.state.address, 
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode,
                    description: this.state.description,
                    type: this.state.type,
                    available: this.state.available
                })
                .then(res => this.newUser(res))
                .catch(err => console.log(err));
        }
    };
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
                                type="name"
                                value={this.state.propertyName}
                                onChange={this.handleInputName}
                                name="name"
                                placeholder=""/>
                            Address
                            <Input
                                type="text"
                                value={this.state.address}
                                onChange={this.handleAddress}
                                name="address"
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
                <Container>
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
                                                    <Col size="md-8">
                                                        <CardBlock>
                                                            <CardTitle>
                                                                <strong>
                                                                    {property.name}
                                                                </strong>
                                                            </CardTitle>
                                                            <CardSubtitle>
                                                                <strong>
                                                                    {property.address}
                                                                    , {property.city}
                                                                    , {property.state}
                                                                    , {property.zipcode}
                                                                </strong>
                                                            </CardSubtitle>
                                                            <CardText>
                                                                <strong>
                                                                    {property.description}
                                                                </strong>
                                                            </CardText>
                                                        </CardBlock>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card>
                                    ))}
                            </span>
                        )
                        : (
                        <Container>
                            <Row >
                                <InverseButton toggle="modal" target="#addProperty">
                                    Add a Property
                                </InverseButton>
                            </Row>
                        </Container>
                        )}
                </Container>
            </Body>
        );
    }
}
export default Manager;