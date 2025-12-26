const express = require ('express');

const app = express();

// app.use("/",(req,res) => {
//     res.send("hi from home page");
// })

// order or routing is very important

// app.use("/hello",(req,res) => {
//     res.send("hello hello hello");
// })


// this will match all the http api method to /test
app.use("/test",(req,res) => {
    res.send("hello from server");
})

// only match get api call
app.get("/user",(req,res) => {
    res.send({firstName:"javed",lastName:"Ahmed"})

})

app.post("/user",(req,res) => {
    console.log("save data to database")
    res.send("data succesfully saved to DB")

})

app.delete("/user",(req,res) => {
    res.send("deleted succesfully")

})

// app.use("/",(req,res) => {
//     res.send("hi from home page");
// })

app.listen(3000,() => {
    console.log("server started on port 3000")
});