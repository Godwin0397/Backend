// import the user model
const User = require("../models/user");

// import the required modules
const bycrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// define the user controller
const usercontroller = {
    // define register function
    register: async (req, res) => { 
        try {
            // get the user data from the request body
            const { username, passwordHash, name, location } = req.body;
            // check if the user already exists
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            // hash the password
            const saltRounds = 10;
            const hashedPassword = await bycrypt.hash(passwordHash, saltRounds);

            // create a new user
            const newUser = new User({
                username,
                hashedPassword,
                name,
                location
            });
            // save the user to the database    
           const savedUser = await newUser.save();
            // return the saved user
            res.status(201).json({ message: "User Created Successfully", user: savedUser});
           
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = usercontroller;