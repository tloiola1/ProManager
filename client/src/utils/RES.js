import axios from "axios";

export default {
  getResidentPropertyId: function(id) {
    return axios.get("/api/res/" + id); 
  },
  deleteResident: function(id) {
    return axios.delete("/api/res/" + id); 
  },
  editResident: function(data) {
    console.log("Utils API AddResident");
    console.log(data);
    return axios.post("/api/res/"+ data._id, data);
  }
};
