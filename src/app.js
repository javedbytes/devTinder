const express = require ('express');

const app = express();

app.get("/user",(req,res,next) => {
    // route handler
    console.log("handleling the route")
    // res.send("response")
    next()
},(req,res) => {
    // route handler 2
     console.log("handleling the route 2")
    res.send("response 2")
})

app.listen(3000,() => {
    console.log("server started on port 3000")
});