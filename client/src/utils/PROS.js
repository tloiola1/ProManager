import axios from "axios";
 
export default {
//   // Gets User login
//   getProsById: function(id) {
//     console.log("Utils API getPros");
//     console.log(id);
//     return axios.get("/api/pros/" + id);
//   },
  //Post New Pros
  postPros: function(postData) {
    console.log("Utils API postPros"); 
    console.log(postData);
    return axios.post("/api/pros", postData);
  },
  // Gets All Pros
  getAllPros: function() {
    console.log("Utils API getAllPros");
    // console.log(id);
    return axios.get("/api/pros");
  }//,
//   // Post New PropertY
//   deletePros: function(data) {
//     console.log("Utils API DeletePros");
//     console.log(data);
//     return axios.post("/api/pros", data);
//   }
};
