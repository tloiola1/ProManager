import axios from "axios";

export default { 
  
  postMessage: function(data) {
    // console.log("Data");
    // console.log(data);
    return axios.post("/api/message", data);
  },
  deleteMessage: function(data) {
    // console.log("Data");
    console.log(data);
    return axios.post("/api/message/"+ data.propertyId, data);
  }
};