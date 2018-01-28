import axios from "axios";

export default {
  
  //Post New User
  postImage: function(postData) {
    // console.log("Utils API postImage"); 
    // console.log(postData);
    return axios.post("/api/img", postData);
  }
};
