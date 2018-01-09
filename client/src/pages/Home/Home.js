import React, {Component} from "react";
import {Col, Container, Row} from "../../components/Grid";
import {FixedHeader} from "../../components/Header";
import {Body} from "../../components/Body";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "../../components/Modal";
import {H1, Margin} from "../../components/Tag";
import {Button} from "../../components/Button";
import {Logo} from "../../components/Logo";
import {NavButton} from "../../components/Nav";
import { Card,CardPhoto,CardTitle,CardSubtitle,CardText,CardBlock} from "../../components/Card";
import API from "../../utils/API";
import {Input, FormBtn} from "../../components/Form";

class Home extends Component {

    state = {
        properties: [],
        users: [],
        name: "",
        email: "",
        password: "",
        phone: "",
        title: ""
    };

    componentDidMount() {
        this.loadProperties();
    };
    loadProperties = () => {
        API
            .getProperty()
            .then(res => {
                // console.log("loadProperty"); console.log(res.data);
                this.setState({
                    properties: res.data,
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    description: "",
                    available: "",
                    photo: ""
                });
            })
            .catch(err => console.log(err));
    };
    handleUserName = (event) => {
        this.setState({name:  event.target.value});
    };
    handleUserEmail = (event) => {
        this.setState({email: event.target.value});
    };
    handleUserPassword = (event) => {
        this.setState({password: event.target.value});
    };
    handleUserPhone = (event) => {
        this.setState({phone: event.target.value});
    };
    handleUserTitle = (event) => {
        this.setState({title: event.target.value});
    };
    //Login User
    handleFormLogin = event => {
        if (this.state.email && this.state.password) {
            API
                .getUser({
                    email: this.state.email, 
                    password: this.state.password
                })
                .then(res => this.allowAccess(res))
                .catch(err => console.log(err));
        }
    };
    // Create User Function
    handleFormRegister = event => {
        if (this.state.name && this.state.email && this.state.password && this.state.phone && this.state.title) {
            API
                .postUser({
                    name: this.state.name, 
                    email: this.state.email, 
                    password: this.state.password,
                    phone: this.state.phone,
                    title: this.state.title
                })
                .then(res => this.newUser(res))
                .catch(err => console.log(err));
        }
    };
    newUser = (res) => {
        console.log(res);
    }
    allowAccess = (res) => {
        if (this.state.email === res.data[0].email && this.state.password === res.data[0].password) {
            alert("Allow Access To User!");
            return;
        } else {
            alert("Not A Valid User!");
            return;
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
                                <H1>
                                    <Button toggle="modal" target="#login">Login</Button>
                                    <Button toggle="modal" target="#register">Register</Button>
                                </H1>
                            </NavButton>
                        </Row>
                    </Container>
                </FixedHeader>
                {/* ----------Login Modal---------- */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    id="login">
                    <Modal>
                        <ModalHeader>Login</ModalHeader>
                        <ModalBody>
                            Email
                            <Input
                                value={this.state.email}
                                onChange={this.handleUserEmail}
                                name="email"
                                placeholder=""/>
                            Password
                            <Input
                                type="password"
                                value={this.state.password}
                                onChange={this.handleUserPassword}
                                name="password"
                                placeholder=""/>
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.handleFormLogin}>
                                Submit
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* ---------Register Modal-------- */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    id="register">
                    <Modal>
                        <ModalHeader>Sign Up</ModalHeader>
                        <ModalBody>
                            Name
                            <Input
                                type="name"
                                value={this.state.name}
                                onChange={this.handleUserName}
                                name="name"
                                placeholder=""/>
                            Email
                            <Input
                                type="email"
                                value={this.state.email}
                                onChange={this.handleUserEmail}
                                name="email"
                                placeholder=""/>
                            Password
                            <Input
                                type="password"
                                value={this.state.password}
                                onChange={this.handleUserPassword}
                                name="password"
                                placeholder=""/>
                            Phone
                            <Input
                                type="text"
                                value={this.state.phone}
                                onChange={this.handleUserPhone}
                                name="phone"
                                placeholder=""/>
                            <div
                                className="col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    value={this.state.title === "rent"}
                                    onChange={this.handleUserTitle}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                I want to find a new home.
                            </div>
                            <div
                                className="divRadio col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    value={this.state.title === "manager"}
                                    onChange={this.handleUserTitle}
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                I own a property and I want to rent.
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.handleFormRegister}>
                                Submit
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* Margin Top */}
                <Margin/> 
                {/* --Display Properties available--*/}
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
                            <h3
                                style={{
                                color: "white"
                            }}>No Results to Display</h3>
                        )}
                </Container>
                <a href="/findproperty" className="btn btn-large-success">Find a new home.</a>
            </Body>
        );
    }
}
export default Home;