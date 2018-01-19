import React, { Component } from "react";
import {Body} from "../../components/Body";
import { Col, Container, Row } from "../../components/Grid";
import { FixedHeader } from "../../components/Header";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "../../components/Modal";
import { Card,CardTitle,CardSubtitle,CardText,CardBlock} from "../../components/Card";//,CardPhoto
import { InverseButton, EditBtn, DeleteBtn } from "../../components/Button";//, Button, ToDoBtn
import { Logo } from "../../components/Logo";
import {Input, FormBtn, TextArea } from "../../components/Form";
import { Span, Margin } from "../../components/Tag";
import { NavButton } from "../../components/Nav";
import { Name } from "../../components/Name";
import PROP from "../../utils/PROP";
import TASK from "../../utils/TASK";
import PROS from "../../utils/PROS";
import RES from "../../utils/RES";
// import { isNull } from "util";

class Manager extends Component {

    state = {
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
        foreignkey: "",
        propertyId: "",
        task: "",
        showModal: ""
    };
    componentDidMount() {
        this.setState({showModal: false});
        this.loadUserInfo();
        this.loadUserData();
    };
    loadUserInfo = (id) => {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({name: sessionStorage.getItem("name")});
        }
    };
    loadUserData = () =>{

        PROP
            .getPropertyById(sessionStorage.getItem("id"))
            .then(res => {
                console.log("Test"); console.log(res.data[1].todos);
                // const todos = [];
                // for(let i = 0; i <= .length; i++){
                //     todos.push(res.data[1].todos[i]);
                // }
                // this.setState({
                //     todos: todos
                // });
                // console.log(this.todos);
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
    // handlePropertyId = event => this.setState({ propertyId: event.target.value });
//

    AddMyProperty = event => {
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
    AddMyPros = event => {
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
    AddTask = event => {
        console.log(event);
        // if(this.state.task){
            // RES
            //     .addTask({
            //         _id: sessionStorage.getItem("id"),
            //         propertyname: this.state.Name,
            //         resident: {
            //             firstName: this.state.firstName, 
            //             lastName: this.state.lastName,
            //             email: this.state.email,
            //             phone: this.state.phone
            //         }
            //     })
            //     .then(res => window.location.reload())//
            //     .catch(err => console.log(err));
        // }
    }
    deleteTask = (propId, taskId) => {
        const ids = {
            propId, 
            taskId
        }
        TASK
                .deleteTask(ids)
                .then(res => console.log(res))//window.location.reload()
                .catch(err => console.log(err));
    }
    editResident = event =>{
        if (this.state.Name && this.state.firstName && this.state.lastName && this.state.email && this.state.phone) {
            RES
                .editResident({
                    _id: sessionStorage.getItem("id"),
                    propertyname: this.state.Name,
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
    deleteResident = id =>{
        console.log(id);
        RES
                .deleteResident(id)
                .then(res => window.location.reload())
                .catch(err => console.log(err));
    }
    deleteProperty = id =>{
        PROP
                .deleteProperty(id)
                .then(res => window.location.reload())
                .catch(err => console.log(err));
    }
    render() {
        return (
            <Body>
{/*     Header                  */}
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
{/*     Add Pros Modal          */}
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
                                <i>X</i>
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.AddMyPros}>
                                <i>Submit</i>
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                    </div>
{/*     Contact Modal           */}
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
                                                <FormBtn className="btn btn-danger" value={providers._id} onClick={this.deletePro}>
                                                Delete Contact
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
{/*     Load My Propeties Modal */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="Contact"
                    aria-hidden="true"
                    id="myProperties"
                    style={{marginTop: "150px"}}>
                    <Container>
                    <Row className="justify-content-between">
                    <Col size="lg-11 md-11 sm-12">
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
                                                        <EditBtn toggle="modal" target="#addProperty" style={{margin: "10px"}} onClick={() => this.addResident(property._id)}>
                                                            Edit Property
                                                        </EditBtn>
                                                        <DeleteBtn className="btn btn-outline-danger" onClick={() => this.deleteProperty(property._id)} style={{margin: "10px"}}>
                                                            Delete Property
                                                        </DeleteBtn>
                                                    </Col>
{/*     Load My Residents       */}
                                                    <Col size="md-4">
                                                        <CardBlock>
                                                            <CardTitle>
                                                                <strong>
                                                                    {property.resident.firstName}
                                                                    <span> </span>
                                                                    {property.resident.lastName}
                                                                </strong>
                                                            </CardTitle>
                                                            <CardSubtitle>
                                                                <strong>
                                                                📧  {property.resident.email}
                                                                </strong>
                                                            </CardSubtitle>
                                                            <CardText>
                                                                <strong>
                                                                📞   {property.resident.phone}
                                                                </strong>
                                                            </CardText>
                                                        </CardBlock>
                                                        <EditBtn toggle="modal" target="#addTask" style={{margin: "10px"}} onClick={() => this.AddTask(property._id)}>
                                                            Task
                                                        </EditBtn>
                                                        <EditBtn toggle="modal" target="#edit" style={{margin: "10px"}}>
                                                            Edit
                                                        </EditBtn>
                                                        <DeleteBtn className="btn btn-outline-danger" onClick={() => this.deleteResident(property.resId)} style={{margin: "10px"}}>
                                                        Delete
                                                        </DeleteBtn>
                                                    </Col>
{/*     Tasks TODO              */}
                                                    <Col size="md-3">
                                                        <CardBlock>
                                                            <CardTitle>
                                                                <strong>
                                                                    <i>
                                                                    To Dos
                                                                    </i>
                                                                </strong>
                                                            </CardTitle>
                                                                <strong>{property.todos.length ? (
                                                                <CardSubtitle>
                                                                {property.todos.map(task => (
                                                                    <span key={task._id}>
                                                                    {task.task}🔨
                                                                    <span>
                                                                    <DeleteBtn className="btn btn-outline-danger" onClick={() => this.deleteTask(property._id,task._id)} style={{margin: "10px"}}>
                                                                        X
                                                                    </DeleteBtn>
                                                                    </span>
                                                                    <hr></hr>
                                                                    </span>
                                                                    
                                                                ))}
                                                                </CardSubtitle>
                                                                ) : (<p></p>)}
                                                                </strong>
                                                        </CardBlock>
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
                    <Col size="sm-1">
                        <FormBtn className="btn btn-warning col-sm-12" data-dismiss="modal">
                            X
                        </FormBtn>
                    </Col>
                   </Row>
{/*     Add Task Modal          */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="AddPros"
                    aria-hidden="true"
                    id="addTask">
                    <Modal>
                        <ModalHeader>Add Task</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                value={this.state.task}
                                onChange={this.handleTask}
                                name="task"
                                placeholder="E.g. 'Water leak' or 'Garage door jamed'"/>
                        </ModalBody>
                        <ModalFooter>
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                <i>X</i>
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.AddTask}>
                                <i>Submit</i>
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                    </div>
{/*     Add Resident Modal      */}
                <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="EditModal"
                    aria-hidden="true"
                    id="edit"
                    position="absolute">
                    <Modal>
                        <ModalHeader>Edit Resident</ModalHeader>
                        <ModalBody>
                            Property Name
                            <Input
                                type="text"
                                value={this.state.Name}
                                onChange={this.handleInputName}
                                name="Name"
                                placeholder=""/>
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
                            <FormBtn className="btn btn-secondary" data-dismiss="modal">
                                <i>X</i>
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.editResident}>
                                <i>Submit</i>
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                    </div>
                    </Container>
                    </div>
{/*     Add Property Modal      */}
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
                                <i>X</i>
                            </FormBtn>
                            <FormBtn className="btn btn-primary" onClick={this.AddMyProperty}>
                                <i>Submit</i>
                            </FormBtn>
                        </ModalFooter>
                    </Modal>
                    </div>
{/*     My Add Buttons          */}
                <Container>
                    <Row>
                        <Col size="lg-2 md-3 sm-12">
                            <InverseButton toggle="modal" target="#todo">
                            ToDo
                            </InverseButton>
                            <InverseButton toggle="modal" target="#contact">
                            My Pros
                            </InverseButton>
                            <InverseButton toggle="modal" target="#addPros">
                            Add Pros
                            </InverseButton>
                            <InverseButton toggle="modal" target="#addProperty">
                                Add Property
                            </InverseButton>
                            <InverseButton toggle="modal" target="#myProperties">
                                My Properties
                            </InverseButton>
                        </Col>
                        <Col size="lg-2 md-3 sm-12">
                        </Col>
                        <Col size="lg-6 md-3 sm-12">
                                
                        </Col>
                    </Row>
                </Container>
            </Body>
        );
    }
}
export default Manager;