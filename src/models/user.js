const { min } = require("moment");
const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    emailId: {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type : Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("gender is not valid")
        }
    }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "this is the about of the user"
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

// const User = mongoose.model("User", userSchema)

// module.exports = User;

// OR 

module.exports = mongoose.model("User",userSchema);