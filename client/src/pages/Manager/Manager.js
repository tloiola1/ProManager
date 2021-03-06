// Imports
import React, { Component } from "react";
    import Dropzone from 'react-dropzone';
    import request from 'superagent';
    import {Body} from "../../components/Body";
    import { FixedHeader } from "../../components/Header";
    import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle,CardSubtitle, CardBody, Col, Container, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
    import { Logo } from "../../components/Logo";
    import {Input, TextArea } from "../../components/Form";
    import { Margin, MarginTop } from "../../components/Tag";
    import { NavButton } from "../../components/Nav";
    import { ProfilePicture } from "../../components/ProfilePicture";
    import { SettingsIcon, HomeIcon, ButtonIcon } from "../../components/Icon";
    import { PanelBox } from "../../components/SearchBox";
    import PROP from "../../utils/PROP";
    import UPDATE from "../../utils/UPDATE";
    import MESSAGE from "../../utils/MESSAGE";
    import PROS from "../../utils/PROS";
    import RES from "../../utils/RES";
    import USER from "../../utils/USER";
    import IMG from "../../utils/IMG";
    import INBOX from "../../utils/INBOX";
    // import { IncomingMessage } from "http";
//Class Component
class Manager extends Component {
    
    componentDidMount() {
        if(sessionStorage.getItem("firstName") === null) { window.location = "/"; }
        else { 
            this.setState({ profilePic: sessionStorage.getItem("img")});
            this.setState({ profileFirstName: sessionStorage.getItem("firstName")});
            this.setState({ profileLastName: sessionStorage.getItem("lastName")});
            this.setState({ profileEmail: sessionStorage.getItem("email")});
            this.setState({ profilePhone: sessionStorage.getItem("phone")});
            this.setState({ profileId: sessionStorage.getItem("id")});
            this.loadUserData();
        }
        // this.loadUserInfo(); 
        
      };
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            addProsModalOpen: false,
            addProfilePictureModalOpen: false,
            addPropertyModalOpen: false,
            addMessageModalOpen: false,
            addResidentModalOpen: false,
            myInboxModalOpen: false,
            myProsCollapse: false,
            myPropertiesModal: false,
            dropdownOpen: false,
            dropupOpen: false,
            dropupButtonOpen: false,
            properties: [], 
            pros: [],
            inbox: [],
            profileFirstName: "",
            profileLastName: "",
            profilePhone: "",
            profileId: "",
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
            propertyId: "",
            message: "",
            id: "",
            business: "",
            price: "",
            update: false
        };
        this.addProsModal = this.addProsModal.bind(this);
        this.addProfilePictureModal = this.addProfilePictureModal.bind(this);
        this.addPropertyModal = this.addPropertyModal.bind(this);
        this.addMessageModal = this.addMessageModal.bind(this);
        this.addResidentModal = this.addResidentModal.bind(this);
        this.myInboxModal = this.myInboxModal.bind(this);
        this.myPros = this.myPros.bind(this);
        this.myProperties = this.myProperties.bind(this);
        this.dropDown = this.dropDown.bind(this);
        this.dropUpButton = this.dropUpButton.bind(this);
        this.dropUp = this.dropUp.bind(this);
        this.state.uploadedFile= null;
        this.state.uploadedFileCloudinaryUrl= '';
        this.state.CLOUDINARY_UPLOAD_URL= "https://api.cloudinary.com/v1_1/promanager/image/upload";
        this.state.CLOUDINARY_UPLOAD_PRESET= "adpt8bps";
        };
    //
    clear() {
        // this.setState({name: ''});
        this.setState({firstName: ''});
        this.setState({lastName: ''});
        this.setState({email: ''});
        this.setState({Name: ''});
        this.setState({address1: ''});
        this.setState({city: ''});
        this.setState({state: ''});
        this.setState({zipcode: ''});
        this.setState({description: ''});
        this.setState({type: ''});
        this.setState({available: ''});
        this.setState({phone: ''});
        this.setState({todoSize: ''});
        // this.setState({propertyId: ''});
        this.setState({message: ''});
        // this.setState({id: ''});
        this.setState({business: ''});
        // this.setState({profilePic: ''});
        this.setState({price: ''});
        this.setState({uploadedFileCloudinaryUrl: ''});
        }
    //Display User Data
    loadUserData = () =>{
        this.setState({update: false});
        PROP
            .getUserProperties(this.state.profileId)
            .then(res => {
                this.setState({
                    properties: res.data 
                });
                console.log(res.status);
            })
            .catch(err => console.log(err));
        PROS
            .getAllPros()
            .then(res => {
                const data = [];
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].foreignkey === this.state.profileId) data.push(res.data[i]);
                }
                this.setState({ pros: data });
                console.log(res.status);
            })
            .catch(err => console.log(err));
        USER
            .getUser()
            .then(res =>{                
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i]._id === this.state.profileId){
                        for(let j = 0; j < res.data[i].message.length; j++){
                            data.push(res.data[i].message[j]);
                        }
                        this.setState({ inbox: data });
                    }
                }
                
                
                console.log(res.status);
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
        handleComposedMessage = event => this.setState({ composedMessage: event.target.value });
        handleUserLastName = event => this.setState({ lastName: event.target.value });
        handleUserEmail = event => this.setState({ email: event.target.value });
        handleMessage = event => this.setState({ message: event.target.value });
        handleBusiness = event => this.setState({ business: event.target.value });
        handlePrice = event => this.setState({ price: event.target.value });
    //DropDown
    dropDown() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    //DropUp
    dropUp() {
        this.setState({
          dropupOpen: !this.state.dropupOpen
        });
      }
    //DropUpButton
    dropUpButton() {
        this.setState({
          dropupButtonOpen: !this.state.dropupButtonOpen
        });
      }
    //Add Pros Modal Toggle
    addProsModal() { 
        this.clear();
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
        };
    //My Pros Collapse Toggle
    myPros() { 
        this.setState({ myProsCollapse: !this.state.myProsCollapse })
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
                    foreignkey: this.state.profileId
                })
                .then(res => console.log(res.status))
                .catch(err => console.log(err));
        }
        this.loadUserData();
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
     };
    //Delete Pro
    deletePro = id => {
        PROS
                .deletePros(id)
                .then(res => console.log(res.status))//window.location.reload()
                .catch(err => console.log(err));
                this.loadUserData();
      };
    //Add Tasks
    addMessageModal = (id) => {
        this.clear();
        this.setState({ propertyId: id});
        this.setState({ addMessageModalOpen: !this.state.addMessageModalOpen });     
      };
    //
    addMessage = (id)=> {
        if(this.state.message){
            MESSAGE
                .postMessage({
                    _id: this.state.propertyId,
                    message: {
                        text: this.state.message
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        this.setState({ addMessageModalOpen: !this.state.addMessageModalOpen });
        this.loadUserData();
     };
    //Delet Task
    deleteMessage = (propertyId, messageId) => {
        // console.log(propertyId, messageId);
        const data ={
            propertyId,
            messageId
        }
        MESSAGE
                .deleteMessage(data)
                .then(res => console.log(res))//window.location.reload()
                .catch(err => console.log(err));
        this.loadUserData();
      }
      addResidentModal = id => { 
        this.clear(); 
        this.setState({ addResidentModalOpen: !this.state.addResidentModalOpen });
        this.setState({ propertyId: id});
      };
    //editResident
    editResident = id => {
        this.clear();
        this.setState({update: true});
        RES
            .getResidentPropertyId(id)
            .then( res => {
                this.setState({firstName: res.data[0].resident.firstName});
                this.setState({lastName: res.data[0].resident.lastName});
                this.setState({firstName: res.data[0].resident.firstName});
                this.setState({email: res.data[0].resident.email});
                this.setState({phone: res.data[0].resident.phone});
                this.setState({ addResidentModalOpen: !this.state.addResidentModalOpen });
                this.setState({ propertyId: id});
            })
            .catch( err => console.log(err));
      }
    //Submit Resident
    submitResident = id =>{
        // console.log(this.state.propertyId);
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
                .then(res => console.log(res))//
                .catch(err => console.log(err));
        }
        this.loadUserData(); // 
        this.setState({ addResidentModalOpen: !this.state.addResidentModalOpen });
      }
    //
    deleteResident = id =>{
        // console.log(id);
        RES
                .deleteResident(id)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        this.setState({ myPropertiesModal: !this.state.myPropertiesModal });
        this.loadUserData();
      }
    //Add Property Modal Toggle
    addPropertyModal() {
        this.clear();
        this.setState({update: false});
        this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
        };
    //
    editProperty = id => {
        this.clear();
        this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
        UPDATE
            .getPropertyById(id)
            .then( res => {
                console.log(res);
                    this.setState({ propertyId: res.data[0]._id });
                    this.setState({ Name: res.data[0].propertyname });
                    this.setState({ address1: res.data[0].address.address1 });
                    this.setState({ city: res.data[0].address.city });
                    this.setState({ state: res.data[0].address.state });
                    this.setState({ zipcode: res.data[0].address.zipcode });
                    this.setState({ description: res.data[0].description });
                    this.setState({ type: res.data[0].type });
                    this.setState({ id: res.data[0].foreignkey });
                    this.setState({ price: res.data[0].price });
                    this.setState({ uploadedFileCloudinaryUrl: res.data[0].img });
                    this.setState({ update: true });
            })
            .catch( err => console.log(err));
      }
    //Collapse My Properties
    myProperties(){ 
        this.setState({ myPropertiesModal: !this.state.myPropertiesModal })
        }; 
    //Add Property
    submitMyProperty = event => {
        if (this.state.Name && this.state.address1 && this.state.city && this.state.state && this.state.zipcode && this.state.description && this.state.type) 
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
                    owner:{
                        firstName: this.state.profileFirstName,
                        lastName: this.state.profileLastName,
                        email: this.state.profileEmail,
                        phone: this.state.profilePhone,
                        _id: this.state.profileId
                    },
                    description: this.state.description,
                    type: this.state.type,
                    foreignkey: sessionStorage.getItem("id"),
                    price: this.state.price,
                    img: this.state.uploadedFileCloudinaryUrl
                })
                .then(res => console.log(res.status))
                .catch(err => console.log(err));
        }
        this.loadUserData();
        this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
      };
    //Update Property
    updateProperty = id =>{
        if (this.state.Name && this.state.address1 && this.state.city && this.state.state && this.state.zipcode && this.state.description && this.state.type) 
        {
            UPDATE
                .updateProperty({
                    _id: this.state.propertyId,
                    propertyname: this.state.Name, 
                    address: {
                        address1: this.state.address1, 
                        city: this.state.city,
                        state: this.state.state,
                        zipcode: this.state.zipcode
                    },
                    description: this.state.description,
                    type: this.state.type,
                    price: this.state.price,
                    img: this.state.uploadedFileCloudinaryUrl
                })
                .then(res => console.log(res.status))
                .catch(err => console.log(err));
        }
        this.loadUserData();
        this.setState({ addPropertyModalOpen: !this.state.addPropertyModalOpen });
      }
    //
    deleteProperty = id =>{
        console.log(id);
        PROP
                .deleteProperty(id)
                .then(res => {this.loadUserData(); this.myProperties() })
                .catch(err => console.log(err));
      }
    //Upload Image
    addProfilePictureModal() { 
        this.setState({ addProfilePictureModalOpen: !this.state.addProfilePictureModalOpen })
        };
    //
    onImageDrop(files) {
        const file = files[0];        
        this.setState({
          uploadedFile: files[0]
        });
        let upload = request.post(this.state.CLOUDINARY_UPLOAD_URL)
                         .field('upload_preset', this.state.CLOUDINARY_UPLOAD_PRESET)
                         .field('file', file);
    
        upload.end((err, res) => {
          if (err) {
            console.error(err);
          }
        //   console.log(res)
          if (res.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: res.body.secure_url
            })
          }
        })
        // this.handleImageUpload(files[0]);
      }
    //
    onProfilePictureDrop(files) {
        const file = files[0];
        this.setState({
          uploadedFile: files[0]
        });
        let upload = request.post(this.state.CLOUDINARY_UPLOAD_URL)
                         .field('upload_preset', this.state.CLOUDINARY_UPLOAD_PRESET)
                         .field('file', file);
    
        upload.end((err, res) => {
          if (err) {
            console.error(err);
          }
        //   console.log(res)
          if (res.body.secure_url !== '') {
            this.setState({
              profilePic: res.body.secure_url
            })
            sessionStorage.setItem("img", res.body.secure_url);
            IMG
                .postImage({
                    _id: sessionStorage.getItem("id"),
                    img: res.body.secure_url
                })
                .then(res => {
                    this.addProfilePictureModal();
                    this.setState({ addProfilePictureModalOpen: !this.state.addProfilePictureModalOpen });
                })
                .catch(err => console.log(err));
          }
        })
      }
    //
    inboxMessage(){
        this.setState({ inboxMessageModalOpen: !this.state.inboxMessageModalOpen });
        }
    //
    inboxMessageModal = (sender_id) => {
        console.log(sender_id);
        this.setState({id: sender_id});
        this.inboxMessage();
        this.setState({composedMessage: `Thanks for your interest in my property.\nI'll contact you shortly.\n${this.state.profileFirstName} ${this.state.profileLastName}.`});  
       }
    // thi function sends inbox message inquiries for property Owner
    submitInboxMessage(){
        this.myInboxModal();
        this.inboxMessage();
        INBOX
            .postMessage({
                _id: this.state.id,// the property foreignkey which is the user id
                message: {
                    text: this.state.composedMessage,// composed message
                    sender_id: this.state.profileId
                }
            })
            .then(res => console.log(res.status))
            .catch(err => console.log(err));
            this.setState({ inboxMessageModalOpen: !this.state.inboxMessageModalOpen });
            this.loadUserData();
        }

    //Add Property Modal Toggle
    myInboxModal() {
        this.setState({ myInboxModalOpen: !this.state.myInboxModalOpen });
        };
    //Delete Inbox Message
    deleteInboxMessage = (userId, messageId) => {
        console.log(userId, messageId);
        const data ={
            userId,
            messageId
        }
        INBOX
                .deleteMessage(data)
                .then(res => console.log(res.status))//window.location.reload()
                .catch(err => console.log(err));
                this.loadUserData();
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
                            <Col sm="2" xs="2">
                                <Logo/>
                            </Col>
                            <Col sm="10" xs="10">
                                <NavButton>
                                    <span> {/* onClick=this.addProfilePictureModal} */}
                                        <ProfilePicture src={this.state.profilePic}/>
                                        <strong> 
                                            {" "}<em>{this.state.profileFirstName}</em>
                                        </strong>
                                    </span>    
                                    <ButtonDropdown className="hideMeAt768" isOpen={this.state.dropdownOpen} toggle={this.dropDown}>
                                        <DropdownToggle outline color="secondary">
                                        <SettingsIcon/>{this.state.inbox.length}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Settings</DropdownItem>
                                            <DropdownItem/>
                                            <DropdownItem >Edit Profile Info</DropdownItem>
                                            <DropdownItem><a onClick={this.addProfilePictureModal}>Edit Profile Picture</a></DropdownItem>
                                            <DropdownItem><a onClick={this.myInboxModal}>You Have {this.state.inbox.length} Messages</a></DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </NavButton>
                            </Col>
                        </Row>
                    </Container>
                </FixedHeader>
                <Margin/>
{/*     My Buttons                  */}
                <Container>
                    <Row>
                        <Col md="3" className="myButtons hideMeAt768">
                            <Button className="col-sm-12" color="success" onClick={this.addProsModal} style={{ margin: '.5rem' }}>Add Pros</Button>
                            <Button className="col-sm-12" color="success" onClick={this.myPros} style={{ margin: '.5rem' }}>My Pros</Button>
                            <Button className="col-sm-12" color="success" onClick={this.myProperties} style={{ margin: '.5rem' }}>My 
                                Properties
                            </Button>
                            <Button className="col-sm-12" color="success" onClick={this.addPropertyModal} style={{ margin: '.5rem' }}>Add Property</Button>
                        </Col>
{/*     Message TODO                */}
                        <Col xs="12" sm="12" md="9">
                            {this.state.properties.length ? (
                                <span>
                                {this.state.properties.map(property => (
                                    <Card key={property._id}>
                                        <Container>
                                            <Row>
                                                <Col xs="12" sm="12" md="6">
                                                    <CardBody>
                                                        <CardTitle>
                                                            Property:{" "}
                                                            <strong>{property.propertyname}
                                                            </strong>
                                                            <br></br>
                                                            Resident:{property.resident.lastName === null ? 
                                                            <Button color="info" onClick={()=>{ this.addResidentModal(property._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                                            Add Resident
                                                        </Button> : <span> {" "}{property.resident.firstName}{" "}{property.resident.lastName}
                                                           </span> }
                                                        </CardTitle>
                                                        <CardSubtitle>      {property.resident.lastName === null ? "" :
                                                            <Button color="info" style={{margin: "1rem"}} onClick={() => this.addMessageModal(property._id)}>
                                                                Message Resident
                                                            </Button>
                                                             }
                                                        </CardSubtitle>
                                                    </CardBody>
                                                </Col>
                                                <Col xs="12" sm="12" md="6">
                                                    <CardBody>
                                                        <CardTitle>
                                                            <strong>My Inbox
                                                            </strong>
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                        {property.message.map(message => (
                                                            <span key={message._id}>       <hr></hr>
                                                                {message.text}🔨
                                                                <span>
                                                                <Button color="danger" onClick={() => this.deleteMessage(property._id, message._id)} style={{margin: "irem"}}>
                                                                X
                                                                </Button>
                                                            </span>
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
                            ) : (<span ><ModalHeader className="col-md-8" style={{color: "white"}}>
                                <h2>
                                    Welcome to ProManager!
                                </h2>
                            </ModalHeader> 
                            <ModalBody className="col-md-8 " body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <h4 style={{color: "white"}}>
                                    Managing your properties and real estate 
                                    is easier than ever before when using ProManager. 
                                    You will have a better communication experience
                                    with your tenants and Home Repair Service Professionals.
                                    <br />
                                    With ProManager eveybody wins!!!
                                </h4>
                            </ModalBody>
                            </span>
                            )}
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
                    ) : ( <ModalHeader toggle={this.myPros}>Your Professionals List is Empty</ModalHeader> )}
                </Modal>
{/*     Load My Propeties Modal     */}
                <Modal isOpen={this.state.myPropertiesModal}>
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
                                        <br/>{property.description}
                                        <br/>{"$"}{property.price}
                                    </strong>
                                </ModalBody>
                                <ModalFooter style={{padding: "0rem"}}>
                                    <Button color="info" onClick={()=>{ this.editProperty(property._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Edit Property
                                    </Button>
                                    <Button color="danger" onClick={() => this.deleteProperty(property._id)} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Delete Property
                                    </Button>
                                </ModalFooter>
                                <hr/>
                                
{/*     Load My Residents           */}
                                {property.resident.lastName !== null ?
                                <ModalHeader>
                                    <strong>
                                        {property.resident.firstName}{" "}
                                        {property.resident.lastName}
                                    </strong>
                                </ModalHeader>
                                :<span>
                                    <ModalHeader>
                                        To add resident click "Add Resident"
                                    </ModalHeader>
                                    <ModalFooter style={{padding: "0px"}}>
                                        <Button color="info" onClick={()=>{ this.addResidentModal(property._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                            Add Resident
                                        </Button>
                                    </ModalFooter>
                                </span>
                                }
                                {property.resident.lastName !== null ?
                                <ModalBody>
                                    <strong>
                                    <a herf={"mailto:"+ property.resident.email}><span role="img" aria-label="emoji">📧</span>{" "}{property.resident.email}</a>
                                    <br></br>
                                    <a href={"tel:"+ property.resident.phone}><span role="img" aria-label="emoji">📞</span>{" "}{property.resident.phone}</a>
                                    </strong>
                                </ModalBody>
                                : ''}
                                {property.resident.lastName !== null ?
                                <ModalFooter style={{padding: "0px"}}>
                                    <Button color="info" onClick={()=>{ this.editResident(property._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Edit Resident
                                    </Button>
                                    <Button color="danger" onClick={() => this.deleteResident(property._id)} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Delete Resident
                                    </Button>
                                </ModalFooter>
                                : ''}
                                <hr style={{border: "2px solid #000"}}></hr>
                            </span>
                        ))}
                        </span>
                    ) : ( <ModalHeader toggle={this.myProperties}> Add Your Property Here </ModalHeader> )}
                </Modal>
{/*     Add Property Modal          */}
                <Modal isOpen={this.state.addPropertyModalOpen} toggle={this.addPropertyModal} className={this.props.className}>
                    <ModalHeader toggle={this.addPropertyModal} >Add Property</ModalHeader>
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
                        Monthly Rent Price:
                        <Input
                            type="text"
                            value={this.state.price}
                            onChange={this.handlePrice}
                            name="price"
                            placeholder="$"/>
                        <hr></hr>
                        <form>
                            <div className="FileUpload">
                            <Dropzone id="dropZone" onDrop={this.onImageDrop.bind(this)}
                                multiple={false}
                                accept="image/*">
                                
                            <div>
                            <img alt="PropImage" src={this.state.uploadedFileCloudinaryUrl} style={{height: "10rem", with: "10rem"}}/>
                            </div>
                            <small>Click to select a file to upload.</small>
                            </Dropzone>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                    {this.state.update === false ? 
                        <Button color="success" onClick={this.submitMyProperty}>
                            <i>Submit</i>
                        </Button>
                    : 
                        <Button color="success" onClick={this.updateProperty}>
                            <i>Update</i>
                        </Button>
                    }
                    </ModalFooter>
                </Modal>
{/*     Add Resident Modal          */}
                <Modal isOpen={this.state.addResidentModalOpen} toggle={this.addResidentModal} className={this.props.className}>
                    <ModalHeader toggle={this.addResidentModal}>
                        {this.state.lastName === null ? <span>Add</span> : <span>Edit</span>} Resident</ModalHeader>
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
                        <Button color="success" onClick={this.submitResident}>
                            {this.state.update === false ?
                                <i>Submit</i>
                            : <i>Update</i> }
                        </Button>
                    </ModalFooter>
                </Modal>
{/*     Add Pros Modal              */}
                <Modal isOpen={this.state.addProsModalOpen} toggle={this.addProsModal} className={this.props.className}>
                        <ModalHeader toggle={this.addProsModal}>Add Home Repair Service Professional</ModalHeader>
                        <ModalBody>
                            Name
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
                                placeholder="E.g. 'Mark, Plumber' or 'Handyman'"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.submitMyPros}>
                                <i>Submit</i>
                            </Button>
                        </ModalFooter>
                    </Modal>
{/*     Add message Modal           */}
                <Modal isOpen={this.state.addMessageModalOpen} toggle={this.addMessageModal} className={this.props.className}>
                    <ModalHeader toggle={this.addMessageModal}>Add Task</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={this.state.message}
                            onChange={this.handleMessage}
                            name="task"
                            placeholder="E.g. 'Water leak' or 'Garage door jamed'"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.addMessage}>
                            <i>Submit</i>
                        </Button>
                    </ModalFooter>
                </Modal>
{/*     Add Profile Picture         */}
                <Modal isOpen={this.state.addProfilePictureModalOpen} toggle={this.addProfilePictureModal} className={this.props.className}>
                    <ModalHeader toggle={this.addProfilePictureModal}>Add Your Profile Picture</ModalHeader>
                    <ModalBody>
                    <form>
                        <div className="FileUpload">
                        <Dropzone id="dropZone" onDrop={this.onProfilePictureDrop.bind(this)}
                            multiple={false}
                            accept="image/*">
                            
                        <div>
                        <img alt="ProfileImage" src={this.state.uploadedFileCloudinaryUrl} style={{height: "10rem", with: "10rem"}}/>
                        </div>
                        <small>Click to select a file to upload.</small>
                        </Dropzone>
                        </div>
                    </form>
                    </ModalBody>
                </Modal>
{/*     Send Message Modal          */}
                <Modal isOpen={this.state.inboxMessageModalOpen} toggle={this.inboxMessageModal} className={this.props.className}>
                    <ModalHeader toggle={this.inboxMessageModal}>Reply</ModalHeader>
                    <ModalBody>
                        Message
                        <TextArea
                            type="textarea"
                            rows="4" 
                            value={this.state.composedMessage}
                            onChange={this.handleComposedMessage}
                            name="composedMessage"
                            placeholder=""/>
                    </ModalBody>
                    <ModalFooter>
                       <Button color="success" onClick={()=> {this.submitInboxMessage()}}>
                            <i>Submit</i>
                        </Button>
                    </ModalFooter>
                </Modal>
{/*     My Inbox Modal              */}
                <Modal isOpen={this.state.myInboxModalOpen} toggle={this.myInboxModal} className={this.props.className}>
                {this.state.inbox.length ? (
                    <span>
                    {this.state.inbox.map(message => (
                        <span key={message._id}>
                        <ModalHeader toggle={this.myInboxModal}>Inbox</ModalHeader>
                        <ModalBody>
                            {message.text}
                        </ModalBody>
                        <ModalFooter style={{padding: "0rem"}}>
                        <Button outline color="info" onClick={()=>{this.inboxMessageModal(message.sender_id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                Reply
                            </Button>
                            <Button  color="danger" onClick={()=>{this.deleteInboxMessage(this.state.profileId, message._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                Delete
                            </Button>
                        </ModalFooter>
                        <hr style={{border: "2px solid #000"}}></hr>
                        </span>
                    ))}
                    </span>
                ) : (<ModalHeader toggle={this.myInboxModal}>Your Inbox is Empty</ModalHeader>)}
                </Modal>
                
            <MarginTop/>
{/* Footer */}
                
                <nav className="navbar fixed-bottom navbar-light visible" sm="12">
                <PanelBox/>
                <Row>
                        <Col sm="4">
                        <ButtonDropdown  isOpen={this.state.dropupButtonOpen} toggle={this.dropUpButton} dropup style={{ width: "100%"}}>
                            <DropdownToggle outline color="secondary">
                                <ButtonIcon/>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <a onClick={this.addProsModal}>
                                        Add Pros
                                    </a>
                                </DropdownItem>
                                <DropdownItem >
                                    <a onClick={this.myPros}>
                                        My Pros
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a onClick={this.addPropertyModal}>
                                        Add Property
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a onClick={this.myProperties}>
                                        My Properties
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>    
                        </Col>
                        <Col sm="4">
                        <ButtonDropdown style={{ width: "100%"}} onClick={()=> window.location = "/"}>
                            <DropdownToggle outline color="secondary">
                            <HomeIcon/>
                            </DropdownToggle>
                        </ButtonDropdown>
                        </Col>
                        <Col sm="4">
                        <ButtonDropdown isOpen={this.state.dropupOpen} toggle={this.dropUp} dropup style={{ margin: '.5rem' }}>
                            <DropdownToggle caret outline color="secondary">
                            <SettingsIcon/>{this.state.inbox.length}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >Edit Profile Info</DropdownItem>
                                <DropdownItem><a onClick={this.addProfilePictureModal}>Edit Profile Picture</a></DropdownItem>
                                <DropdownItem><a onClick={this.myInboxModal}>You Have {this.state.inbox.length} Messages</a></DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        </Col>
                </Row>
                </nav>
            </Body>
        );
    }
}
export default Manager;