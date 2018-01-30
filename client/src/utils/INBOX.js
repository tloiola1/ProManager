import axios from "axios";

export default { 

  postMessage: function(data){
    console.log(data);
    return axios.post("/api/inbox", data);
  },
  deleteMessage: function(data) {
    // console.log("Data"); 
    console.log(data);
    return axios.post("/api/inbox/"+ data.userId, data);
  }
};