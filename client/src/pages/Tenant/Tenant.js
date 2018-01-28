// Imports
import React, { Component } from "react";
    import Dropzone from 'react-dropzone';
    import request from 'superagent';
    import {Body} from "../../components/Body";
    import { FixedHeader } from "../../components/Header";
    import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle,CardSubtitle, CardBody, Col, Container, Row} from "reactstrap";
    import { CardPhoto } from "../../components/Card";
    import { Logo } from "../../components/Logo";
    import {Input } from "../../components/Form";
    import { Margin } from "../../components/Tag";
    import { NavButton } from "../../components/Nav";
    import { ProfilePicture } from "../../components/ProfilePicture";
    import PROP from "../../utils/PROP";
    import MESSAGE from "../../utils/MESSAGE";
    import PROS from "../../utils/PROS";
    import IMG from "../../utils/IMG";
    import USER from "../../utils/USER";
//
class Manager extends Component {
    
    componentDidMount() {
        if(sessionStorage.getItem("name") === null) { window.location = "/"; }
        else { 
            this.setState({ profilePic: sessionStorage.getItem("img")});
            this.setState({name: sessionStorage.getItem("name")});
            this.setState({id: sessionStorage.getItem("id")});
            this.loadUserData();
        }
      };
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            addProsModalOpen: false,
            addMessageModalOpen: false,
            myProsModalOpen: false,
            allPropertiesModalOpen: false,
            findPropertiesModalOpen: false,
            properties: [], 
            pros: [],
            owner: [],
            searchProperties: [],
            ownerId: "",
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
            propertyId: "",
            profilePic: "",
            message: "",
            id: "",
            business: "",
            type: "",
            location: "",
        };
        this.addProsModal = this.addProsModal.bind(this);
        this.addProfilePictureModal = this.addProfilePictureModal.bind(this);
        this.addMessageModal = this.addMessageModal.bind(this);
        this.myPros = this.myPros.bind(this);
        this.allPropertiesModal = this.allPropertiesModal.bind(this);
        this.findAllProperties = this.findAllProperties.bind(this);
        this.findProperties = this.findProperties.bind(this);
        this.state.uploadedFile= null;
        this.state.uploadedFileCloudinaryUrl= '';
        this.state.CLOUDINARY_UPLOAD_URL= "https://api.cloudinary.com/v1_1/promanager/image/upload";
        this.state.CLOUDINARY_UPLOAD_PRESET= "adpt8bps";
      };
    //Display User Data
    loadUserData = () =>{
        PROP
            .getAllProperties()
            .then(res => { 
                // console.log(res.data);
                const email = sessionStorage.getItem("email");
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].resident.email === email){
                        data.push(res.data[i]);
                    }
                }
                this.setState({ownerId: data[0].foreignkey});
                this.setState({ properties: data });
                // console.log(this.state.properties);
            })
            .catch(err => console.log(err));

        USER
            .getUser()
            .then(res =>{
                const _id = this.state.ownerId;
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i]._id === _id){
                        data.push(res.data[i]);
                    }
                }
                this.setState({ owner: data });
            })
            .catch(err => console.log(err));

        PROS
            .getAllPros()
            .then(res => {
                // console.log(res.data[0].foreignkey)
                const data = [];
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].foreignkey === this.state.ownerId || res.data[i].foreignkey === this.state.id){
                        data.push(res.data[i]);
                    }
                }
                this.setState({ pros: data });
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
        handleMessage = event => this.setState({ message: event.target.value });
        handleBusiness = event => this.setState({ business: event.target.value });
        handlePropertyType = event => this.setState({ type: event.target.value });
        handleLocation = event => this.setState({ location: event.target.value });

    //Add Pros Modal Toggle
    addProsModal() { 
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
        };
    //My Pros Collapse Toggle
    myPros() { 
        this.setState({ myProsModalOpen: !this.state.myProsModalOpen })
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
                .then(res => console.log(res.status))
                .catch(err => console.log(err));
        }
        this.loadUserData();
        this.setState({ addProsModalOpen: !this.state.addProsModalOpen })
        };
    //Delete Pro
    deletePro = id => {
        console.log(id)
        PROS
                .deletePros(id)
                .then(res => console.log(res.status))//window.location.reload()
                .catch(err => console.log(err));
      };
    //
    addMessageModal = (id) => {
        console.log(id);
        this.setState({ propertyId: id});
        this.setState({ addMessageModalOpen: !this.state.addMessageModalOpen });     
      };
    //Add Message
    addMessage = ()=> {
        this.setState({ addMessageModalOpen: !this.state.addMessageModalOpen });
        if(this.state.message){
            MESSAGE
                .postMessage({
                    _id: this.state.propertyId,
                    message: {
                        text: this.state.message
                    }
                })
                .then(res => console.log(res.status))//
                .catch(err => console.log(err));
        }
        this.setState({ addMessageModalOpen: !this.state.addMessageModalOpen });
        this.loadUserData();
        };
    //Delete Message
    deleteMessage = (propertyId, messageId) => {
        console.log(propertyId, messageId);
        const data ={
            propertyId,
            messageId
        }
        MESSAGE
                .deleteMessage(data)
                .then(res => console.log(res.status))//window.location.reload()
                .catch(err => console.log(err));
        }
    //All Properties Modal
    allPropertiesModal(){this.setState({ allPropertiesModalOpen: !this.state.allPropertiesModalOpen })}
    //My Properties Modal
    findAllProperties(){
        // console.log(this.state.type);       
        // console.log(this.state.location);
        if( this.state.type && this.state.location){
            PROP
                .getAllProperties()
                .then(res => {
                    // console.log(res.data)
                    const data = [];
                    for(let i = 0; i < res.data.length; i++){
                        if((res.data[i].address.zipcode === this.state.location || res.data[i].address.city.toLocaleLowerCase() === this.state.location.toLocaleLowerCase()) && res.data[i].available === 'true' && res.data[i].type === this.state.type){
                            data.push(res.data[i]);
                        }
                    }
                    this.setState({ searchProperties: data });
                    this.setState({ allPropertiesModalOpen: !this.state.allPropertiesModalOpen })
                    // console.log(this.state.searchProperties);
                })
                .catch(err => console.log(err));
        }
        // this.setState({ findPropertiesModalOpen: !this.state.findPropertiesModalOpen })
        
      };
    //Find Properties
    findProperties(){
        // console.log(this.state.type);
        this.setState({ findPropertiesModalOpen: !this.state.findPropertiesModalOpen })
      };
    //Upload Image
    addProfilePictureModal() { 
        this.setState({ addProfilePictureModalOpen: !this.state.addProfilePictureModalOpen })
      };
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
            this.setState({ profilePic: res.body.secure_url })
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
    emailOwner = id => {
        USER
            .getUser()
            .then(res =>{
                // const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i]._id === id){
                        console.log(res.data[i].email);
                        return;
                    }
                }
            })
            .catch(err => console.log(err));

    }
    removeProperty= id => {
        const temp =[];
        for(let i = 0; i < this.state.searchProperties.length; i++){
            if(this.state.searchProperties[i]._id !== id){
                temp.push(this.state.searchProperties[i])
            }
        }
        this.setState({searchProperties: temp});
        
    }
    render() {
        return (
            <Body>
{/*     Header              */}
                <div className="fixed-top fixed-top-custom"></div>
                <FixedHeader>
                    <Container>
                        <Row>
                            <Col sm="2">
                            <Logo/>
                            </Col>
                            <Col sm="10">
                            <NavButton>
                                    <span>
                                        <a><ProfilePicture src={this.state.profilePic} onClick={this.addProfilePictureModal}></ProfilePicture></a>
                                        <strong> 
                                            Hello <em>{this.state.name}</em>
                                        </strong>
                                    </span>
                                    <a id="logoff" href="/"><strong> | Log Off</strong></a>
                            </NavButton>
                            </Col>
                        </Row>
                    </Container>
                </FixedHeader>
                <Margin/>
{/*     My Buttons          */}
                <Container>
                    <Row>
                        <Col sm="3">
                            <Button className="col-sm-12" color="success" onClick={this.addProsModal} style={{ margin: '.5rem' }}>Add Pros</Button>
                            <Button className="col-sm-12" color="success" onClick={this.myPros} style={{ margin: '.5rem' }}>My Pros</Button>
                            <Button className="col-sm-12" color="success" onClick={this.findProperties} style={{ margin: '.5rem' }}>
                                Find New Home
                            </Button>
                        </Col>
{/*     My Home             */}
                        <Col xs="auto" sm="9">
                            {this.state.properties.length ? (
                                <span>
                                {this.state.properties.map(property => (
                                    <Card key={property._id}>
                                        <Container>
                                            <Row>
                                            {this.state.owner.map(owner => (
                                                <Col xs="auto" sm="5" key={owner._id}>
                                                    <CardBody>
                                                        <CardTitle key={owner._id}>
                                                            Property:{" "}
                                                            <strong>{property.propertyname}
                                                            </strong>
                                                            <br></br>
                                                            Owner:{" "}{owner.name.firstName}{" "} {owner.name.lastName}
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                            <a herf={"mailto:"+ owner.email}><span role="img" aria-label="emoji">📧</span>{" "}{owner.email}</a>
                                                            <br></br>
                                                            <a href={"tel:"+ owner.phone}><span role="img" aria-label="emoji">📞</span>{" "}{owner.phone}</a>
                                                        </CardSubtitle>
                                                        <CardSubtitle>
                                                            <Button color="info" style={{margin: "1rem"}} onClick={() => this.addMessageModal(property._id)}>
                                                                Message Owner
                                                            </Button>
                                                        </CardSubtitle>
                                                    </CardBody>
                                                </Col>
                                            ))}
{/*     My Inbox            */}
                                                <Col xs="auto" sm="5">
                                                    <CardBody>
                                                        <CardTitle>
                                                            <strong>My Inbox
                                                            </strong>
                                                        </CardTitle>
                                                        <CardSubtitle>
                                                        {property.message.map(message => (
                                                            <span key={message._id}>
                                                                {message.text}🔨
                                                                <span>
                                                                <Button color="danger" onClick={() => this.deleteMessage(property._id, message._id)} style={{margin: "irem"}}>
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
                            ) : <span/>}
                        </Col>
                    </Row>
                </Container>
{/*     My Pros Modal       */}
                <Modal isOpen={this.state.myProsModalOpen} toggle={this.myPros}>
                    {this.state.pros.length ? (
                        <span>
                        {this.state.pros.map(pro => (
                            <span key={pro._id}>
                                    <ModalHeader toggle={this.myPros}>
                                        <strong>
                                            {pro.name}{" "}
                                        </strong>
                                        {pro.business}
                                    </ModalHeader>
                                    <ModalBody>
                                        <strong>
                                        <span role="img" aria-label="emoji">🏠</span>{" "}{pro.address.address1}
                                        <br></br>
                                        <span role="img" aria-label="emoji">📞</span>{" "}<a href={'tel:'+pro.phone}>
                                            {pro.phone}
                                        </a>
                                        </strong>
                                    </ModalBody>
                                    <ModalFooter style={{padding: "0rem"}}>
                                        {pro.foreignkey !== this.state.ownerId ? 
                                        <Button color="danger" onClick={()=>{this.deletePro(pro._id)}} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                            Delete
                                        </Button>
                                        : <span style={{padding:"1rem"}}>Only the Owner has the Right to Delete this Pro</span>}
                                    </ModalFooter>
                                    <hr style={{border: "2px solid #000"}}></hr>
                            </span>
                        ))}
                        </span>
                    ) : ( <h3>Your Contact List is Empty</h3> )}
                </Modal>
{/*     Add Pros Modal      */}
                <Modal isOpen={this.state.addProsModalOpen} toggle={this.addProsModal} className={this.props.className}>
                        <ModalHeader toggle={this.addProsModal}>Add Service Provider</ModalHeader>
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
{/*     Add Message Modal      */}
                <Modal isOpen={this.state.addMessageModalOpen} toggle={this.addMessageModal} className={this.props.className}>
                    <ModalHeader toggle={this.addMessageModal}>Add Message</ModalHeader>
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
{/*     Find Propeties Modal     */}
                <Modal isOpen={this.state.findPropertiesModalOpen} toggle={this.findProperties}>
                    <ModalHeader toggle={this.findProperties}>
                        <strong>
                            Find New Home or New Office
                        </strong>
                    </ModalHeader>
                    <ModalBody>
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
                            Home for Rental.
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
                            Bussiness Office for Rental.
                        </div>
                        Location
                        <Input
                            type="text"
                            value={this.state.location}
                            onChange={this.handleLocation}
                            name="city"
                            placeholder="E.g 'Atlanta' or 'Area Code'"/>
                    </ModalBody>
                    <ModalFooter style={{padding: "0rem"}}>
                        <Button color="success" onClick={ this.findAllProperties } style={{margin: "1rem"}}>
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
{/*     Load My Propeties Modal     */}
                <Modal isOpen={this.state.allPropertiesModalOpen} toggle={this.findAllProperties} style={{width: "100%"}}>
                    {this.state.searchProperties.length ? (
                        <span>
                        {this.state.searchProperties.map(property => (
                            <span key={property._id}>
                                <ModalHeader toggle={this.allPropertiesModal}>
                                    <CardPhoto> 
                                        {property.img}
                                    </CardPhoto>
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
                                    <Button color="info" onClick={()=>{ this.emailOwner(property.foreignkey)}} style={{ margin: "1rem 1rem 0rem 0rem" }}>
                                        Interersted? Email the Owner
                                    </Button>
                                    <Button color="danger" onClick={() => this.removeProperty(property._id)} style={{margin: "1rem 1rem 0rem 0rem"}}>
                                        Not Interested
                                    </Button>
                                </ModalFooter>
                                <hr/>
                                <hr style={{border: "2px solid #000"}}></hr>
                            </span>
                        ))}
                        </span>
                    ) : ( 
                    <h3><Button onClick={ this.allPropertiesModal } > No Results </Button></h3> )}
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
            </Body>
        );
    }
}
export default Manager;