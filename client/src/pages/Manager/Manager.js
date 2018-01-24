// Imports
import React, { Component } from "react";
    import Dropzone from 'react-dropzone';
    import request from 'superagent';
    import {Body} from "../../components/Body";
    import { FixedHeader } from "../../components/Header";
    import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle,CardSubtitle, CardBody, Col, Container, Row} from "reactstrap";
    import { Logo } from "../../components/Logo";
    import {Input, FormBtn, TextArea } from "../../components/Form";
    import { Span, Margin } from "../../components/Tag";
    import { NavButton } from "../../components/Nav";
    import { Name } from "../../components/Name";
    import PROP from "../../utils/PROP";
    import TASK from "../../utils/TASK";
    import PROS from "../../utils/PROS";
    import RES from "../../utils/RES";
    import USER from "../../utils/USER";
//
class Manager extends Component {
    
    componentDidMount() {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({name: sessionStorage.getItem("name")});this.loadUserData()
        }
        // this.loadUserInfo();
        
      };
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            addProsModalOpen: false,
            addPropertyModalOpen: false,
            addtaskModalOpen: false,
            addResidentModalOpen: false,
            myProsCollapse: false,
            myPropertiesCollapse: false,
            properties: [], 
            pros: [],
            todos: [],
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            Name: "",
            address1: "",
            city: "",
            state: "",
            zipcode: "",
            description: "",
            type: "",
            available: "",
            phone: "",
            todoSize: "",
            propertyId: "",
            task: "",
            id: "",
            business: ""
        };
        this.addProsModal = this.addProsModal.bind(this);
        this.addPropertyModal = this.addPropertyModal.bind(this);
        this.addTaskModal = this.addTaskModal.bind(this);
        this.addResidentModal = this.addResidentModal.bind(this);
        this.myPros = this.myPros.bind(this);
        this.myProperties = this.myProperties.bind(this);
        // this.state = { items: [], text: '' };
        // this.login = this.login.bind(this);
      };
    //Add Pros Modal Toggle
    addProsModal() { 
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
        };
    //Add Property Modal Toggle
    addPropertyModal() { 
        this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
        };
    //
    addTaskModal = (id) => {
        console.log(id);
        this.setState({ propertyId: id});
        this.setState({ addTaskModalOpen: !this.state.addTaskModalOpen });     
      };
    //
    addResidentModal = id => { 
        console.log(id); 
        this.setState({ addResidentModalOpen: !this.state.addResidentModalOpen });
        this.setState({ propertyId: id});
      };
    //My Pros Collapse Toggle
    myPros() { 
        this.setState({ myProsCollapse: !this.state.myProsCollapse })
        };
    //Collapse My Properties
    myProperties(){ 
        this.setState({ myPropertiesCollapse: !this.state.myPropertiesCollapse })
        }; 
    //Display User Data
    loadUserData = () =>{
        PROP
            .getUserProperties(sessionStorage.getItem("id"))
            .then(res => {
                console.log("Test"); console.log(res.data[0].todos.length);
                this.setState({
                    properties: res.data 
                });
            })
            .catch(err => console.log(err));
        USER
            .getMyPros(sessionStorage.getItem("id"))
            .then(res => {
                this.setState({
                    pros: res.data,
                });
                console.log(this.state.pros);
            })
            .catch(err => console.log(err));
      };
    //Handle OnChange Events

    handleInputName = event =>  this.setState({ Name: event.target.value });
        handleAddress1 = event => this.setState({ address1: event.target.value });
        handleCity = event => this.setState({ city: event.target.value });
        handlePhone = event => this.setState({ phone: event.target.value });
        handleState = event => this.setState({  state: event.target.value });
        handleZipCode = event => this.setState({ zipcode: event.target.value });
        handleDescription = event => this.setState({ description: event.target.value });
        handlePropertyType = event => this.setState({ type: event.target.value })
        handleAvailability = event => this.setState({ available: event.target.value });
        handleForeignkey = event => this.setState({ foreignkey: event.target.value });
        handleUserFirstName = event => this.setState({ firstName: event.target.value });
        handleUserLastName = event => this.setState({ lastName: event.target.value });
        handleUserEmail = event => this.setState({ email: event.target.value });
        handleTask = event => this.setState({ task: event.target.value });
        handleBusiness = event => this.setState({ business: event.target.value });
    //Add Property
    submitMyProperty = event => {
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
    //Add Pros
    submitMyPros = event => {
        //Mark Plumber 1221 qwertyuiop street 1234567890
        if (this.state.Name && this.state.address1 && this.state.phone) {
            PROS
                .postPros({
                    name: this.state.Name, 
                    address: {
                        address1: this.state.address1, 
                        city: this.state.city,
                        state: this.state.state,
                        zipcode: this.state.zipcode
                    },
                    phone: this.state.phone,
                    business: this.state.business,
                    foreignkey: sessionStorage.getItem("id")
                })
                .then(res => window.location.reload())
                .catch(err => console.log(err));
        } 
     };
    //Delete Pro
    deletePro = id => {
        console.log(id)
        PROS
                .deletePros(id)
                .then(res => console.log(res))//window.location.reload()
                .catch(err => console.log(err));
      };
    //Add Tasks
    addTask = ()=> {
        this.setState({ addTaskModalOpen: !this.state.addTaskModalOpen });
        if(this.state.task){
            TASK
                .postTask({
                    _id: this.state.propertyId,
                    todos: {
                        task: this.state.task
                    }
                })
                .then(res => window.location.reload())//
                .catch(err => console.log(err));
        }
     };
    //
    deleteTask = (propId, taskId) => {
        console.log(propId, taskId);
        const data ={
            propId,
            taskId
        }
        TASK
                .deleteTask(data)
                .then(res => console.log(res))//window.location.reload()
                .catch(err => console.log(err));
      }
    //
    submitEditResident = id =>{
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.phone) {
            RES
                .editResident({
                    _id: this.state.propertyId,
                    resident: {
                        firstName: this.state.firstName, 
                        lastName: this.state.lastName,
                        email: this.state.email,
                        phone: this.state.phone
                    }
                })
                .then(res => window.location.reload())//
                .catch(err => console.log(err));
        }
      }
    //
    deleteResident = id =>{
        console.log(id);
        RES
                .deleteResident(id)
                .then(res => window.location.reload())
                .catch(err => console.log(err));
      }
    //
    deleteProperty = id =>{
        console.log(id);
        PROP
                .deleteProperty(id)
                .then(res => window.location.reload())
                .catch(err => console.log(err));
      }
    //
    render() {
        return (
            <Body>
{/*     Header                      */}
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
{/*     My Buttons                  */}
                <Container>
                    <Row>
                        <Col sm="3">
                            <Button className="col-sm-12" color="primary" onClick={this.addProsModal} style={{ margin: '.5rem' }}>Add Pros</Button>
                            <Button className="col-sm-12" color="primary" onClick={this.myPros} style={{ margin: '.5rem' }}>My Pros</Button>
                            <Button className="col-sm-12" color="primary" onClick={this.myProperties} style={{ margin: '.5rem' }}>My 
                                Properties
                            </Button>
                            <Button className="col-sm-12" color="primary" onClick={this.addPropertyModal} style={{ margin: '.5rem' }}>Add Property</Button>
                        </Col>
{/*     Tasks TODO                  */}
                        <Col xs="auto" sm="9">
                            {this.state.properties.length ? (
                                <span>
                                {this.state.properties.map(property => (
                                    <Card key={property._id}>
                                        <Container>
                                            <Row>
                                                <Col xs="auto" sm="5">
                                                    <CardBody>
                                                        <CardTitle>
                                                            Property:{" "}
                                                            <strong>{property.propertyname}
                                                            </strong>
                                                            <br></br>
                                                            Resident:{" "}{property.resident.firstName}{" "}{property.resident.lastName}
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                            <Button color="info" style={{margin: "1rem"}} onClick={() => this.addTaskModal(property._id)}>
                                                                Add Task
                                                            </Button>
                                                        </CardSubtitle>
                                                    </CardBody>
                                                </Col>
                                                <Col xs="auto" sm="5">
                                                    <CardBody>
                                                        <CardTitle>
                                                            <strong>My Tasks
                                                            </strong>
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                        {property.todos.map(task => (
                                                            <span key={task._id}>
                                                                {task.task}🔨
                                                                <span>
                                                                <Button color="danger" onClick={() => this.deleteTask(property._id, task._id)} style={{margin: "irem"}}>
                                                                X
                                                                </Button>
                                                            </span>
                                                            <hr></hr>
                                                        </span>   
                                                        ))}
                                                        </CardSubtitle>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Card>
                                ))}
                                </span>
                            ) : ( <h3>Add a Property Here</h3> )}
                        </Col>
                    </Row>
                </Container>
{/*     My Pros Modal               */}
                <Modal isOpen={this.state.myProsCollapse} toggle={this.myPros}>
                    {this.state.pros.length ? (
                        <span>
                        {this.state.pros.map(providers => (
                            <span key={providers._id}>
                                    <ModalHeader toggle={this.myPros}>
                                        <strong>
                                            {providers.name}{" "}
                                        </strong>
                                        {providers.business}
                                    </ModalHeader>
                                    <ModalBody>
                                        <strong>
                                        <span role="img" aria-label="emoji">🏠</span>{" "}{providers.address.address1}
                                        <br></br>
                                        <span role="img" aria-label="emoji">📞</span>{" "}<a href={'tel:'+providers.phone}>
                                            {providers.phone}
                                        </a>
                                        </strong>
                                    </ModalBody>
                                    <ModalFooter style={{padding: "0rem"}}>
                                        <Button color="danger" onClick={()=>{this.deletePro(providers._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                            Delete
                                        </Button>
                                    </ModalFooter>
                                    <hr style={{border: "2px solid #000"}}></hr>
                            </span>
                        ))}
                        </span>
                    ) : ( <h3>Add Some Contacts Here</h3> )}
                </Modal>
{/*     Load My Propeties Modal     */}
                <Modal isOpen={this.state.myPropertiesCollapse}>
                    {this.state.properties.length ? (
                        <span>
                        {this.state.properties.map(property => (
                            <span key={property._id}>
                                <ModalHeader toggle={this.myProperties}>
                                    <strong>
                                        {property.propertyname}
                                    </strong>
                                </ModalHeader>
                                <ModalBody>
                                    <strong>
                                        {property.address.address1}
                                        , {property.address.city}
                                        , {property.address.state}
                                        , {property.address.zipcode}
                                        <br></br>{property.description}
                                    </strong>
                                </ModalBody>
                                <ModalFooter style={{padding: "0rem"}}>
                                    <Button color="danger" onClick={() => this.deleteProperty(property._id)} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Delete Property
                                    </Button>
                                </ModalFooter>
                                <hr></hr>
                                
{/*     Load My Residents           */}
                                <ModalHeader>
                                    <strong>
                                        {property.resident.firstName}{" "}
                                        {property.resident.lastName}
                                    </strong>
                                </ModalHeader>
                                <ModalBody>
                                    <strong>
                                    <a herf={"mailto:"+ property.resident.email}><span role="img" aria-label="emoji">📧</span>{" "}{property.resident.email}</a>
                                    <br></br>
                                    <a href={"tel:"+ property.resident.phone}><span role="img" aria-label="emoji">📞</span>{" "}{property.resident.phone}</a>
                                    </strong>
                                </ModalBody>
                                <ModalFooter style={{padding: "0px"}}>
                                    <Button color="info" onClick={()=>{ this.addResidentModal(property._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Edit
                                    </Button>
                                    <Button color="danger" onClick={() => this.deleteResident(property._id)} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                                <hr style={{border: "2px solid #000"}}></hr>
                            </span>
                        ))}
                        </span>
                    ) : ( 
                    <h3>
                        <Button color="info" onClick={this.myProperties} style={{ margin: '.5rem', backgroundColor:"none" }}>
                            Add My Properties Here
                        </Button></h3> )}
                </Modal>
{/*     Add Property Modal          */}
                <Modal isOpen={this.state.addPropertyModalOpen} toggle={this.addPropertyModal} className={this.props.className}>
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
                        <FormBtn className="btn btn-primary" onClick={this.submitMyProperty}>
                            <i>Submit</i>
                        </FormBtn>
                    </ModalFooter>
                </Modal>
{/*     Add Resident Modal          */}
                <Modal isOpen={this.state.addResidentModalOpen} toggle={this.addResidentModal} className={this.props.className}>
                    <ModalHeader toggle={this.addResidentModal}>Edit Resident</ModalHeader>
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
                        Phone
                        <Input
                            type="text"
                            value={this.state.phone}
                            onChange={this.handlePhone}
                            name="phone"
                            placeholder=""/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitEditResident}>
                            <i>Submit</i>
                        </Button>
                    </ModalFooter>
                </Modal>
{/*     Add Pros Modal              */}
                <Modal isOpen={this.state.addProsModalOpen} toggle={this.addProsModal} className={this.props.className}>
                        <ModalHeader toggle={this.addProsModal}>Add Service Provider</ModalHeader>
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
                            Phone
                            <Input
                                type="text"
                                value={this.state.phone}
                                onChange={this.handlePhone}
                                name="phone"
                                placeholder=""/>
                            Business
                            <Input
                                type="text"
                                value={this.state.business}
                                onChange={this.handleBusiness}
                                name="phone"
                                placeholder=""/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.submitMyPros}>
                                <i>Submit</i>
                            </Button>
                        </ModalFooter>
                    </Modal>
{/*     Add Task Modal              */}
                <Modal isOpen={this.state.addTaskModalOpen} toggle={this.addTaskModal} className={this.props.className}>
                    <ModalHeader toggle={this.addTaskModal}>Add Task</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={this.state.task}
                            onChange={this.handleTask}
                            name="task"
                            placeholder="E.g. 'Water leak' or 'Garage door jamed'"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addTask}>
                            <i>Submit</i>
                        </Button>
                    </ModalFooter>
                </Modal>
            </Body>
        );
    }
}
export default Manager;