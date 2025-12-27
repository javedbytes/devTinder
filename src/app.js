const express = require ('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json()) // to parse json body from request middleware

app.post("/signup", async (req, res) => {

    const user = new User(req.body) // new instance of the user model

    try {
         await user.save()
        res.send("user added succesfully")
    } catch (error) {
        res.status(500).send("internal server error")
    }
})

connectDB().then(() => {
    console.log("Database connected")
    app.listen(3000,() => {
    console.log("server started on port 3000")
});
}).catch( err => {
    console.log("database connection fail")
});
