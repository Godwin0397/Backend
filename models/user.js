// importing the required modules
const mongoose = require("mongoose");


// creating schema

const userSchema = new mongoose.Schema({
    username: "string",
    passwordHash: "string",
    name: "string",
    location: {
        type: "string",
        default: "Unknown"
    },
    role: {
        type: "string",
        enum: ["admin", "user"],
        default: "user"
    }
})

// exporting the model
module.exports = mongoose.model("User", userSchema, "users");
