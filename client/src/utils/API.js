import axios from "axios";

export default {
  // Gets User login
  getUser: function(data) {
    console.log("Get Data");
    console.log(data);
    return axios.post("/api/users", data);
  },
  //Post New User
  postUser: function(postData) {
    console.log("Utils API");
    console.log(postData);
    return axios.post("/api/users", postData);
  },
  // Gets all properties
  getAllProperty: function() {
    return axios.get("/api/properties");
  },
  // Post New PropertY
  postProperty: function(postData) {
    return axios.post("/api/properties", postData);
  },
  //Get Property with Id
  getProperty: function(id) {
    return axios.get("/api/properties/" + id);
  },
//   // Deletes the book with the given id
//   deleteProperty: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};
