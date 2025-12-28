const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json()) // to parse json body from request middleware

app.post("/signup", async (req, res) => {

    const user = new User(req.body) // new instance of the user model

    try {
        await user.save()
        res.send("user added succesfully")
    } catch (error) {
        res.status(500).send(error)
    }
})

// get user by email
app.get("/user", async (req, res) => {
    const userEmail = req?.body?.firstName
    try {
        const user = await User.find({ firstName: userEmail })
        console.log(user)
        if (user.length === 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(400).send("something went wrong")
    }

})

// Feed API GET : get all the users from DB
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

// Delete user from DB
app.delete("/user", async (req, res) => {

    const userId = req.body.userId;
    console.log(userId)

    try {
        // const user = await User.findByIdAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId);
        res.status.send("user deleted successfully")
    } catch (error) {
        res.status(400).send("something went wrong", error)
    }

})

// update data of user

app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body

    console.log(data)

    try {
        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators
        });
        res.send("user updated succesfully")
    } catch (error) {
        res.status(400).send("falied to update user" + error)
    }


})

connectDB().then(() => {
    console.log("Database connected")
    app.listen(3000, () => {
        console.log("server started on port 3000")
    });
}).catch(err => {
    console.log("database connection fail")
});
