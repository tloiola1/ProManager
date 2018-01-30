import axios from "axios";

export default {

  getPropertyById: function(id) {
    // console.log("Utils API getProperty by Id");
    // console.log(id);
    return axios.get("/api/update/"+ id);
  },
  updateProperty: function(data) {
    // console.log("Utils API Update");
    // console.log(data);
    return axios.post("/api/update", data);
  }


};
