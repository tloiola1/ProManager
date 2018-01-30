import axios from "axios";
 
export default {
  
  // Gets All Pros
  getAllPros: function() {
    // console.log("Utils API getAllPros");
    // console.log(id);
    return axios.get("/api/pros");
  },
  //Post New Pros
  postPros: function(postData) { 
    // console.log("Utils API postPros"); 
    // console.log(postData);
    return axios.post("/api/pros", postData);
  },
  // console.log("Utils API getPros");
  getMyPros: function(id) {
    return axios.get("/api/users/" + id)
  },
  // Gets User login
  getProsById: function(id) {
    // console.log(id);
    return axios.post("/api/pros/" + id, id);
  },
//   // Post New PropertY
  deletePros: function(_id) {
    return axios.delete("/api/pros/"+ _id);
  }
};
