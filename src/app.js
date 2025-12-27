const express = require ('express');
const connectDB = require("./config/database")
const app = express();


connectDB().then(() => {
    console.log("Database connected")
    app.listen(3000,() => {
    console.log("server started on port 3000")
});
}).catch( err => {
    console.log("database connection fail")
});

//   app.listen(3000,() => {
//     console.log("server started on port 3000")
// });