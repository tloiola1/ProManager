import React, {Component} from "react";
import {Col, Container, Row} from "../../components/Grid";
import {FixedHeader} from "../../components/Header";
import {Body} from "../../components/Body";
import {H1, Margin} from "../../components/Tag";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Logo} from "../../components/Logo";
import {NavButton} from "../../components/Nav";
import { Card,CardPhoto,CardTitle,CardSubtitle,CardText,CardBlock} from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import PROP from "../../utils/PROP";
import USER from "../../utils/USER";
import PROS from "../../utils/PROS";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loginModal: false,
          registerModal: false
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
      };

      login() {
              this.setState({
                loginModal: !this.state.loginModal
        });
      };

      register() {
          this.setState({
              registerModal: !this.state.registerModal
          });
      };

    state = {
        properties: [],
        users: [],
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        title: "",
        search: ""
    };

    componentDidMount() {
        this.loadProperties();
    };
    loadProperties = () => {
        PROP
            .getAllProperties()
            .then(res => {
                console.log("loadProperty"); console.log(res.data);
                this.setState({
                    properties: res.data
                });
            })
            .catch(err => console.log(err));
    };
    handleUserFirstName = (event) => this.setState({firstName:  event.target.value});
    handleUserLastName = (event) => this.setState({lastName:  event.target.value});
    handleUserEmail = (event) => this.setState({email: event.target.value});
    handleUserPassword = (event) => this.setState({password: event.target.value});
    handleUserPhone = (event) => this.setState({phone: event.target.value});
    handleUserTitle = (event) => this.setState({title: event.target.value});
    handleSearch = (event) => this.setState({search: event.target.value});
    //Login User
    formLogin = event => {
        if (this.state.email && this.state.password) {
            USER
                .getUser({
                    email: this.state.email, 
                    password: this.state.password
                })
                .then(res => this.allowAccess(res))
                .catch(err => console.log(err));
        }
    };
    // Create User Function
    formRegister = event => {
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.phone && this.state.title) {
            USER
                .postUser({
                    name: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName
                    },
                    email: this.state.email, 
                    password: this.state.password,
                    phone: this.state.phone,
                    title: this.state.title
                })
                .then(res => this.newUser(res))
                .catch(err => console.log(err));
        }
    };
    //Create New User
    newUser = (res) => {
        sessionStorage.setItem("path", res.data.title);
        sessionStorage.setItem("name", res.data.name.firstName);
        sessionStorage.setItem("id", res.data._id);
        console.log(sessionStorage.getItem("path"));
        if(sessionStorage.getItem("path") === 'rent'){ window.location = '/tenant'}
        else if(sessionStorage.getItem("path") === 'manager'){ window.location = '/manager'}
    }
    allowAccess = (res) => {
        console.log("AllowAccess");
        console.log(res);
        let isValidUser = false;
        for(var i = 0; i < res.data.length; i++){
            if(this.state.email === res.data[i].email && this.state.password === res.data[i].password){
                sessionStorage.setItem("path", res.data[i].title);
                sessionStorage.setItem("name", res.data[i].name.firstName);
                sessionStorage.setItem("id", res.data[i]._id);
                isValidUser = true;
            }
        }
        console.log(isValidUser);
        if(isValidUser) window.location = `/${sessionStorage.getItem("path")}`;
        else this.notAllow();
    };
    notAllow = () => {
        //Neeed to open register modal
        // document.getElementById("register").then( ()=> console.log("Good"));
    }
    render() {
      return (
          <Body>
{/* Fixed Header  */}
            <div className="fixed-top fixed-top-custom"></div>
              <FixedHeader>
                <Container>
                  <Row>
                    <Logo/>
                        <NavButton>
                          <Button color="primary" onClick={this.login}>Login</Button>{''}
                          <Button color="primary"onClick={this.register}>Register</Button>
                        </NavButton>
                    </Row>
                </Container>
              </FixedHeader>
{/* Login Modal     */}
              <Modal isOpen={this.state.loginModal} toggle={this.login} className={this.props.className}>
                <ModalHeader toggle={this.login}>Login</ModalHeader>
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
                <Button color="primary" onClick={this.formLogin}>Submit</Button>
                </ModalFooter>
              </Modal>
{/* Register Modal  */}
              <Modal isOpen={this.state.registerModal} toggle={this.register} className={this.props.className}>
                <ModalHeader toggle={this.register}>Register</ModalHeader>
                <ModalBody>
                    First Name
                    <Input
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleUserFirstName}
                        name="firstname"
                        placeholder=""/>
                    Last Name
                    <Input
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleUserLastName}
                        name="lastname"
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
                            name= "register-radio"
                            value= "rent"
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
                            name= "register-radio"
                            value= "manager"
                            onChange={this.handleUserTitle}
                            style={{
                            marginTop: "7px"
                        }}/>
                        I own a property and I want to rent.
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.formRegister}>Submit</Button>
                </ModalFooter>
              </Modal>
{/* Margin Top      */}
                <Margin/> 
{/* Properties      */}
                <Container>
                    <Row>
                    {/* <Col size="md-8">
                    {this.state.properties.length
                        ? (
                            <span>
                                {this
                                    .state
                                    .properties
                                    .map(property => (
                                        <Card key={property._id}>
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
                                                                    {property.propertyname}
                                                                </strong>
                                                            </CardTitle>
                                                            <hr></hr>
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
                                                </Row>
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
                    </Col> */}
                    <Col size="md-4">
                        <div style={{height: "150px", width: "330px", backgroundColor: "black", opacity: ".5", position: "fixed"}}></div>
                        <div style={{padding: "20px 10px", position: "fixed"}}>
                            <h5 style={{color: "orange"}}>Search For Acredited Professional</h5>
                            <Input  
                                type="text"
                                value={this.state.search}
                                onChange={this.handleSearch}
                                name="search"
                                placeholder=""/>
                            <div style={{marginTop: "20px"}}>
                            <FormBtn className="btn btn-warning">
                                Search
                            </FormBtn>
                            </div>
                        </div>
                    </Col>
                    </Row>
                </Container>
                <a href="/findproperty" className="btn btn-large-success">Find a new home.</a>
            </Body>
        );
    }
}
export default Home; 