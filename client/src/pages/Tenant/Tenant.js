// Imports
import React, { Component } from "react";
    import {Body} from "../../components/Body";
    import { FixedHeader } from "../../components/Header";
    import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle,CardSubtitle, CardBody, Col, Container, Row} from "reactstrap";
    import { Logo } from "../../components/Logo";
    import {Input } from "../../components/Form";
    import { Margin } from "../../components/Tag";
    import { NavButton } from "../../components/Nav";
    import { Name } from "../../components/Name";
    import PROP from "../../utils/PROP";
    import TASK from "../../utils/TASK";
    import PROS from "../../utils/PROS";
    // import RES from "../../utils/RES";
    import USER from "../../utils/USER";
//
class Manager extends Component {
    
    componentDidMount() {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({name: sessionStorage.getItem("name")});this.loadUserData()
        }
      };
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            addProsModalOpen: false,
            addtaskModalOpen: false,
            myProsModalOpen: false,
            properties: [], 
            pros: [],
            todos: [],
            landLord: [],
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            Name: "",
            address1: "",
            city: "",
            state: "",
            zipcode: "",
            phone: "",
            todoSize: "",
            propertyId: "",
            task: "",
            id: "",
            business: ""
        };
        this.addProsModal = this.addProsModal.bind(this);
        this.addTaskModal = this.addTaskModal.bind(this);
        this.myPros = this.myPros.bind(this);
        this.myProperties = this.myProperties.bind(this);
      };
    //Add Pros Modal Toggle
    addProsModal() { 
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
        };
    //
    addTaskModal = (id) => {
        console.log(id);
        this.setState({ propertyId: id});
        this.setState({ addTaskModalOpen: !this.state.addTaskModalOpen });     
      };
    //My Pros Collapse Toggle
    myPros() { 
        this.setState({ myProsModalOpen: !this.state.myProsModalOpen })
        };
    //Collapse My Properties
    myProperties(){ 
        this.setState({ myPropertiesModal: !this.state.myPropertiesModal })
        }; 
    //Display User Data
    loadUserData = () =>{
        PROP
            .getAllProperties()
            .then(res => { 
                const email = sessionStorage.getItem("email");
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].resident.email === email){
                        data.push(res.data[i]);
                    }
                }
                sessionStorage.setItem("landlordId", data[0].foreignkey);
                this.setState({ properties: data });
            })
            .catch(err => console.log(err));

        USER
            .getUser()
            .then(res =>{
                const _id = sessionStorage.getItem("landlordId");
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i]._id === _id){
                        data.push(res.data[i]);
                    }
                }
                this.setState({ landLord: data });
                console.log(this.state.landLord[0]);
                console.log(this.state.landLord[0].name.firstName);
            })
            .catch(err => console.log(err));

        USER
            .getMyPros(sessionStorage.getItem("id"))
            .then(res => {
                this.setState({
                    pros: res.data,
                });
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
        handleForeignkey = event => this.setState({ foreignkey: event.target.value });
        handleUserFirstName = event => this.setState({ firstName: event.target.value });
        handleUserLastName = event => this.setState({ lastName: event.target.value });
        handleUserEmail = event => this.setState({ email: event.target.value });
        handleTask = event => this.setState({ task: event.target.value });
        handleBusiness = event => this.setState({ business: event.target.value });
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
                                    <span>
                                        <strong> 
                                            Hello <Name>{this.state.name}</Name>
                                        </strong>
                                    </span>
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
                            <Button className="col-sm-12" color="primary" onClick={this.myProperties} style={{ margin: '.5rem' }}>
                                Home Sweet Home
                            </Button>
                        </Col>
{/*     Tasks TODO                  */}
                        <Col xs="auto" sm="9">
                            {this.state.properties.length ? (
                                <span>
                                {this.state.properties.map(property => (
                                    <Card key={property._id}>
                                        <Container>
                                            <Row>
                                            {this.state.landLord.map(landLord => (
                                                <Col xs="auto" sm="5">
                                                    <CardBody>
                                                        <CardTitle key={landLord._id}>
                                                            Property:{" "}
                                                            <strong>{property.propertyname}
                                                            </strong>
                                                            <br></br>
                                                            LandLord:{" "}{landLord.name.firstName}{" "} {landLord.name.lastName}
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                            <Button color="info" style={{margin: "1rem"}} onClick={() => this.addTaskModal(property._id)}>
                                                                Add Task
                                                            </Button>
                                                        </CardSubtitle>
                                                    </CardBody>
                                                </Col>
                                            ))}
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
                            ) : ( <h3>No Tasks for You</h3> )}
                        </Col>
                    </Row>
                </Container>
{/*     My Pros Modal               */}
                <Modal isOpen={this.state.myProsModalOpen} toggle={this.myPros}>
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