const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://httpsjaved:qYnfKui2QZNSOE4t@cluster0.t5iv0oj.mongodb.net/devTinder");
};

module.exports = connectDB
// connectDB().then(() => {
//     console.log("Database connected")
// }).catch( err => {
//     console.log("database connection fail")
// });