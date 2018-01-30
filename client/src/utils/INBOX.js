import axios from "axios";

export default { 

  sendMessage: function(data){
    // console.log(data);
    return axios.post("/api/inbox", data);
  },
  deleteMessage: function(data) {
    // console.log("Data"); 
    // console.log(data);
    return axios.post("/api/inbox/"+ data.propertyId, data);
  }
};