import axios from "axios";

export default { 
  
  postTask: function(data) {
    return axios.post("/api/task", data);
  },

  deleteTask: function(data) {
    console.log(data);
    return axios.post("/api/task/"+ data.propId, data.taskId);
  }
//   // Saves a book to the database
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};