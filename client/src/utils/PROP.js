import axios from "axios";

export default {
  // Gets all properties
  getAllProperties: function() {
    // console.log("Utils API getAllProperties");
    // console.log(getData);
    return axios.get("/api/properties");
  },
  // Post New PropertY 
  postProperty: function(data) {
    // console.log("Utils API postProperty");
    // console.log(data);
    return axios.post("/api/properties", data);
  },
  //Get Property with Id
  getPropertyById: function(id) {
    // console.log("Utils API getProperty by Id");
    // console.log(id);
    return axios.get("/api/properties/" + id);
  },
  //
  getUserProperties: function(id) {
    // console.log("Utils API User Properties by Id");
    // console.log(id);
    return axios.get("/api/properties/" + id);
  },
  // Deletes the book with the given id
  deleteProperty: function(id) {
    return axios.delete("/api/properties/" + id);
  }
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};
