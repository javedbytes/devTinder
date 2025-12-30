const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next) => {
   try {
       // read the token from cookies
       const { token } = req.cookies;
        if(!token){
            return res.status(401).send("token is not valid")
        }
       const decodedValue = await jwt.verify(token, "javed@9811")
       const { _id } = decodedValue;
       const user = await User.findById(_id);
       if (!user) {
           return res.status(401).send("unauthenticated access, login required")
       }
       req.user = user;
       next();
       // verify the token
       // find the user from db
   } catch (error) {
         res.status(400 ).send("user not found" + error.message)
   }
 

}

module.exports = {
    userAuth
}