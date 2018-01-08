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
import {Input, FormBtn } from "../../components/Form";

class Home extends Component {

    state = {
        properties: [],
        users: [],
        name: "",
        email: "",
        password: "",
        title: "",
    };

    componentDidMount() {
        this.loadProperties();
    };

    loadProperties = () => {
        API
            .getProperty()
            .then(res => {
                console.log("loadProperty");
                console.log(res.data);
                this.setState({
                    properties: res.data,
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    description: "",
                    photo: ""
                });
            })
            .catch(err => console.log(err));
    };

    handleUserLogin = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        console.log("HUL");
        console.log(value);
        // console.log(userCred);
        // API
        //     .getUser()
        //     .then(res => {
        //         console.log("loadUsers");
        //         console.log(res.data);
        //         this.setState({
        //             users: res.data,
        //             name: "", 
        //             email: "", 
        //             password: "", 
        //             title: ""});
        //     })
        //     .catch(err => console.log(err));
    };

    handleFormSubmit = event => {
        event.preventDefault();
            const email: this.state.email;
            const password: this.state.password;
        console.log(email, password);
    };

    userRegister = (event) => {
        event.preventDefault();
        alert("Register");
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
                {/* Login Modal */}
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
                                onChange={this.handleUserLogin}
                                name="email"
                                placeholder=""
                            />
                            Password
                            <Input
                                type = "password"
                                value={this.state.password}
                                onChange={this.handleUserLogin}
                                name="password"
                                placeholder=""
                            />
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </FormBtn>
                            <FormBtn  className="btn btn-primary">
                                Submit
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* Register Modal */}
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
                            Name:
                            <Input 
                                type = "name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name="name"
                                placeholder=""
                            />
                            Email:
                            <Input
                                type = "email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder=""
                            />
                            Password:
                            <Input
                                type = "password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder=""
                            />
                            <div
                                className="divRadio col-sm-12"
                                style={{
                                marginLeft: "5px"
                            }}>
                                <Input
                                    type="radio"
                                    className="form-check-input"
                                    name="register-radio"
                                    id="optionsRadios1"
                                    value="rent"
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
                                    name="register-radio"
                                    id="optionsRadios2"
                                    value="manage"
                                    style={{
                                    marginTop: "7px"
                                }}/>
                                I own a property and I want to rent.
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={event => this.userRegister(event)}>Submit</button>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* Margin Top */}
                <Margin/> {/* Display Properties available */}
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
                            <h3>No Results to Display</h3>
                        )}
                </Container>
                <a href="/findproperty" className="btn btn-large-success">Find a new home.</a>
            </Body>
        );
    }
}
export default Home;