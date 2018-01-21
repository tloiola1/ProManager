import axios from "axios";

export default {
  
  postTask: function(data) {
    return axios.post("/api/task", data);
  },

  deleteTask: function(data) {
    return axios.delete("/api/task/dlete", data);
  }
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};