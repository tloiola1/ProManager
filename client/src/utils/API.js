import axios from "axios";

export default {
  // Gets all properties
  getProperty: function() {
    return axios.get("/api/properties");
  },
  // Gets User login
  getUser: function(req) {
    return axios.get("/api/users");
  },
  //
  postUser: function(req) {
    return axios.post("/api/users");
  }
//   // Deletes the book with the given id
//   deleteProperty: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};
