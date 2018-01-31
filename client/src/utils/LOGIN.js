import axios from "axios";

export default {
  // Gets User login
  getUserLogin: function(credentials) {
    // console.log("Utils API getUser");
    // console.log(getData);
    return axios.post("/api/login", credentials);
  }
};
