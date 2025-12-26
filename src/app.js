const express = require ('express');

const app = express();


app.get("/getUserData",(req,res) => {
    // better to use try catch
    try {
        
    } catch (error) {
        
    }
    // logic of DB call to get user data
    throw new Error("error")
    res.send("user data send")
})

// error should be first parameter
app.use("/",(error,req, res,next) => {
 if(error){
    // log your error
    res.status(500).send("something went wrong")
 }
})


app.listen(3000,() => {
    console.log("server started on port 3000")
});