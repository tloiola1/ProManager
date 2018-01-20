import axios from "axios";

export default {
  // Gets User login
  getUser: function(getData) { 
    console.log("Utils API getUser");
    console.log(getData);
    return axios.get("/api/users", getData);
  },
  //Post New User
  postUser: function(postData) {
    console.log("Utils API postUser"); 
    console.log(postData);
    return axios.post("/api/users", postData);
  },
  //
  updateUser: function(postData){
    console.log("Utils API UpdateUSer");
    console.log(postData);
    return axios.post("/api/users", postData);
  },
  // Deletes the book with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a book to the database
  // saveUser: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
};
