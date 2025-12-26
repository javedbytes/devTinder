const express = require ('express');

const app = express();

app.get("/user/:userId/:name/:password/",(req,res) => {
    console.log(req.params)
    res.send({firstName:"javed",lastName:"Ahmed"})

})

app.listen(3000,() => {
    console.log("server started on port 3000")
});