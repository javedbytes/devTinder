const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validationSignup } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth")

app.use(express.json()) // to parse json body from request middleware
app.use(cookieParser()); // to parse cookies from request middleware

app.post("/signup", async (req, res) => {
    try {
        // validation of data
        console.log("request body", req.body)
        if (req) {
            validationSignup(req)

        }
        // Encryption of password
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        console.log(passwordHash)

        req.body.password = passwordHash

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: passwordHash,
            age: req.body.age,
        }) // new instance of the user model


        await user.save()
        res.send("user added succesfully")
    } catch (error) {
        res.status(500).send(error.message)
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

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId
    const data = req.body

    try {
        const allowedUpdates = ["age", "gender", "photoUrl", "about", "skills"]

        const isUpdatedAllowed = Object.keys(data).every((k => allowedUpdates.includes(k)))

        if (!isUpdatedAllowed) {
            throw new Error("invalid updates")
        }
        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true
        });
        res.send("user updated succesfully")
    } catch (error) {
        res.status(400).send("falied to update user" + error)
    }
})

app.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            return res.status(404).send("user not found");
        }

        const isPasswordValide = await bcrypt.compare(password, user.password);
        console.log(isPasswordValide)

        if (isPasswordValide) {
            // create jwt token
            const token = await jwt.sign({ _id: user._id }, "javed@9811",{
                expiresIn: "1h"
            })
            console.log("token", token)
            // add token to cookies and send response to user

            res.cookie("token", token,{
                expires: new Date(Date.now() + 3600000), // 1 hour
            })
            res.send("login successful");
        } else {
            res.status(401).send("invalid credentials");
        }

        // res.send("login successful");
    } catch (error) {
        res.status(500).send("internal server error" + error.message)
    }

})

app.get("/profile", userAuth, async (req, res) => {
    try {
        console.log("user profile", req.user)
        res.send("user profile data" + req.user)
    } catch (error) {
        res.status(500).send("internal server error" + error.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send("connection request sent" + user.firstName)
})

connectDB().then(() => {
    console.log("Database connected")
    app.listen(3000, () => {
        console.log("server started on port 3000")
    });
}).catch(err => {
    console.log("database connection fail")
});
