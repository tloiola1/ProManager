import axios from "axios";

export default {
  
  deleteResident: function(id) {
    return axios.delete("/api/res/" + id); 
  },
  editResident: function(data) {
    console.log("Utils API AddResident");
    console.log(data);
    return axios.post("/api/res/"+ data._id, data);
  }
//   // Saves a book to the database 
//   savePoperty: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};
