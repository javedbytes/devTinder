const express = require ('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup", async (req, res) => {
    const userObject = {
        firstName : "abdullah",
        lastName : "Ahmed",
        emailId : "abdul@akasaair.com",
        password: "abdul@123"
    }

    const user = new User(userObject) // new instance of the user model

   await user.save()
   res.send("user added succesfully")
})

connectDB().then(() => {
    console.log("Database connected")
    app.listen(3000,() => {
    console.log("server started on port 3000")
});
}).catch( err => {
    console.log("database connection fail")
});
