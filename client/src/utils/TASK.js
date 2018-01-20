import axios from "axios";

export default {
  
  deleteTask: function(ids) {
    return axios.post("/api/task", ids);
  }
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};