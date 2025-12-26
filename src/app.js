const express = require ('express');

const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth")

// handle auth middleware for all request , GET, POST, DELETE
// app.use("/admin",(req,res,next) => {
//     console.log("admin auth checking...")
//     const token = "xydddz";
//     const isAdminAuthorized = token === "xyz"

//     if(!isAdminAuthorized){
//      res.status(401).send("admin is not authorized")
//     } else {
//         next()
//     }

// })

app.get("/user",userAuth,(req,res) => {
    res.send("user data send")
})

app.use("/admin",adminAuth)

app.get("/admin/getAllData",(req,res) => {
    // logc of checking if the request is authenticated 

    // const token = "xyzkk";
    // const isAdminAuthorized = token === "xyz"
    // if(isAdminAuthorized){
    //         res.send("all data send")

    // } else {
    //     res.status(401).send("admin is not authorized")
    // }
    res.send("all data send")

})

app.get("/admin/deleteUser",(req,res) => {
    // logc of checking if the request is authenticated 

    res.send("deleted a user")
})

app.listen(3000,() => {
    console.log("server started on port 3000")
});