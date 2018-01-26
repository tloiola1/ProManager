const request = require('superagent');
const key = require('../key.js');




module.exports = {

    upload: function(req, res) {
        console.log("****** Upload  ******") 
        const file = req.body;
        const CLOUDINARY_UPLOAD_PRESET = "adpt8bps";
        const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/promanager/image/upload";

        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

            upload.end((err, res) => {
            if (err) {
                console.error(err);
            }
            console.log(res)
            if (res.body.secure_url !== '') {
                console.log(res.body.secure_url)
            }
            })
            .then(cloud => res.json(cloud))
            .catch(err => res.status(422).json(err));
    // 
    // 
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

// Defining methods for the propertyController
// module.exports = {
//   upload: function(req, res) {
//     console.log("Property Controller FindAll.");
//     console.log(req.body);
//     db.Property
//       .find(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };
