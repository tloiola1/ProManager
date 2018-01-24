import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './App.css';

const CLOUDINARY_UPLOAD_PRESET = secret_key;
const CLOUDINARY_UPLOAD_URL = secret_url;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    console.log(files[0]);
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, res) => {
      if (err) {
        console.error(err);
      }
      console.log(res)
      if (res.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            {/* <p>{this.state.uploadedFile.name}</p> */}
            <img src={this.state.uploadedFileCloudinaryUrl} style={{height: "10rem", with: "10rem"}}/>
          </div>}
        </div>
      </form>
    )
  }
}

// import axios from "axios";

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/promanager/image/upload";//adpt8bps

// const CLOUDINARY_UPLOAD_PRESET = "adpt8bps";

// const imgPreview = document.getElementById("img-preview");
// const fileUpload = document.getElementById("file-upload");

// fileUpload.addEventListener('change', (event) =>{
//     const file = event.target.files[0];
//     console.log(file);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

//     axios({
//         url: CLOUDINARY_URL,
//         method: "POST",
//         headers: {
//             "Content-type": "application/x-www-form-urlencoded"
//         },
//         data: formData
//     }).then( res => console.log(res)        
//     ).catch(err => console.log(err))
// })