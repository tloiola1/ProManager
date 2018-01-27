// Imports
import React from "react";
    import {FixedHeader} from "../../components/Header";
    import {Body} from "../../components/Body";
    import {Margin} from "../../components/Tag";
    import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle,CardSubtitle, CardBody, CardText, Col, Container, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
    import {Logo} from "../../components/Logo";
    import {NavButton} from "../../components/Nav";
    import { CardPhoto } from "../../components/Card";
    import {Input } from "../../components/Form";
    import PROP from "../../utils/PROP";
    import USER from "../../utils/USER";
    import "./Home.css"
// import PROS from "../../utils/PROS";

class Home extends React.Component {
    
    componentDidMount() {
        this.loadProperties();
      };
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            loginModal: false,
            registerModal: false,
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
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.toggle = this.toggle.bind(this);
      };
    //Toggle
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    //Display Login Modal
    login() {
            this.setState({
                loginModal: !this.state.loginModal
        });
      };
    //Display Register Modal
    register() {
          this.setState({
              registerModal: !this.state.registerModal
          });
      };
    //Display Properties
    loadProperties = () => {
        PROP
            .getAllProperties()
            .then(res => {
                const array = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].available === "true"){
                        array.push(res.data[i])
                    }
                };
                this.setState({
                    properties: array
                });
                console.log(this.state.properties);
            })
            .catch(err => console.log(err));
      };
    //OnChange Events
    userFirstName = event => this.setState({firstName:  event.target.value});
        userLastName = event => this.setState({lastName:  event.target.value});
        userEmail = event => this.setState({email: event.target.value});
        userPassword = event => this.setState({password: event.target.value});
        userPhone = event => this.setState({phone: event.target.value});
        userTitle = event => this.setState({title: event.target.value});
        handleSearch = event => this.setState({search: event.target.value});
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
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("img", res.data.img);        
        // console.log(sessionStorage.getItem("path"));
        if(sessionStorage.getItem("path") === 'tenant'){ window.location = '/tenant'
        }
        else if(sessionStorage.getItem("path") === 'manager'){ window.location = '/manager'}
      };
    //User Access
    allowAccess = (res) => {
        let isValidUser = false;
        for(var i = 0; i < res.data.length; i++){
            if(this.state.email === res.data[i].email && this.state.password === res.data[i].password){
                sessionStorage.setItem("path", res.data[i].title);
                sessionStorage.setItem("name", res.data[i].name.firstName);
                sessionStorage.setItem("email", res.data[i].email);
                sessionStorage.setItem("id", res.data[i]._id);
                sessionStorage.setItem("img", res.data[i].img);
                isValidUser = true;
            }
        }
        console.log(isValidUser);
        if(isValidUser) window.location = `/${sessionStorage.getItem("path")}`;
        else this.notAllow();
     };
    //User No Access
    notAllow = () => {
        //Neeed to open register modal
        // document.getElementById("register").then( ()=> console.log("Good"));
      }
    searchPro =() => {
        console.log(this.state.search);
    }
    //render
    render() {
      return (
          <Body>
{/* Fixed Header    */}
            <div className="fixed-top fixed-top-custom"></div>
              <FixedHeader>
                <Container>
                  <Row>
                    <Logo/>
                        <NavButton>
                          <Button color="primary" onClick={this.login}style={{margin: "1rem"}}>Login</Button>{''}
                          <Button color="primary"onClick={this.register}style={{margin: "1rem"}}>Register</Button>
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
                    onChange={this.userEmail}
                    name="email"
                    placeholder=""/>
                Password
                <Input
                    type="password"
                    value={this.state.password}
                    onChange={this.userPassword}
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
                        onChange={this.userFirstName}
                        name="firstname"
                        placeholder=""/>
                    Last Name
                    <Input
                        type="text"
                        value={this.state.lastName}
                        onChange={this.userLastName}
                        name="lastname"
                        placeholder=""/>
                    Email
                    <Input
                        type="email"
                        value={this.state.email}
                        onChange={this.userEmail}
                        name="email"
                        placeholder=""/>
                    Password
                    <Input
                        type="password"
                        value={this.state.password}
                        onChange={this.userPassword}
                        name="password"
                        placeholder=""/>
                    Phone
                    <Input
                        type="text"
                        value={this.state.phone}
                        onChange={this.userPhone}
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
                            value= "tenant"
                            onChange={this.userTitle}
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
                            onChange={this.userTitle}
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
                    <Col xm="auto" sm="8">
                    {this.state.properties.length
                        ? (
                            <span>
                                {this
                                    .state
                                    .properties
                                    .map(property => (
                                        <Card key={property._id}>
                                                <Row>
                                                    <Col sm="4">
                                                        <CardPhoto id="myImage">
                                                            {property.img}
                                                        </CardPhoto>
                                                    </Col>
                                                    <Col sm="8">
                                                        <CardBody>
                                                            <CardTitle>
                                                                <strong>
                                                                    {property.propertyname}
                                                                </strong>
                                                            </CardTitle>
                                                            <hr></hr>
                                                            <CardSubtitle>
                                                                <strong>{property.address.address1}
                                                                    , {property.address.city}
                                                                    , {property.address.state}
                                                                    , {property.address.zipcode}
                                                                    <CardText>{property.description}
                                                                    <br/>{"$"}{property.price}
                                                                    </CardText>
                                                                </strong>
                                                                <Button color="primary"onClick={this.register}style={{margin: "1rem 1rem 1rem 0rem", float: "right"}}>Rent this Home</Button>
                                                            </CardSubtitle>
                                                        </CardBody>
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
                    </Col>
{/* Acreddited Pro  */}
                    <Col xm="auto" sm="4">
                        <div style={{height: "150px", width: "330px", backgroundColor: "black", opacity: ".5", position: "fixed"}}></div>
                        <div style={{padding: "20px 10px", position: "fixed"}}>
                        <h2 className="text-center" style={{color: "orange"}}>Need Help?</h2>
                            <h5 style={{color: "orange"}}>Search For Acredited Professional</h5>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{float:"right"}}>
                                <Button id="caret" outline color="warning" style={{float:"right"}}>Search</Button>
                                <DropdownToggle caret color="warning" />
                                <DropdownMenu>
                                    <DropdownItem>Header</DropdownItem>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    {/* <DropdownItem divider/> */}
                                    <DropdownItem>Another Action</DropdownItem>
                                </DropdownMenu>
                                </ButtonDropdown>
                            <div style={{marginTop: "20px"}}>
                            {/* <Button color="warning" onClick= { this.searchPro } style={{float: "right"}}>
                                Search
                            </Button> */}
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