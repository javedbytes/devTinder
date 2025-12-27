const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type : String
    },
    lastName : {
        type : String
    },
    emailId: {
        type : String
    },
    password: {
        tyepe: String
    },
    age: {
        type : Number
    },
    gender: {
        tyepe : String
    }
});

// const User = mongoose.model("User", userSchema)

// module.exports = User;

// OR 

module.exports = mongoose.model("User",userSchema);