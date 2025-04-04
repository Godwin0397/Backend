// import the user model
const User = require("../models/user");

// import the required modules
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utlis/config");

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
                passwordHash: hashedPassword,
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
    },

    // define login function
    login: async (req, res) => {
        try {
            // get the user data from the request body
            const { username, passwordHash } = req.body;

            // check if the user exists
            const user = await User.findOne({username});
            
            // check if the user doesn't exist, return error
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // compare the password with the hashed password
            const isMatch = await bycrypt.compare(passwordHash, user.passwordHash);
            
            // check if the password doesn't match, return error
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // create a token for the user
            const token = jwt.sign({ id: user._id, 
                username:user.username,
                name: user.name }, JWT_SECRET, {
                expiresIn: "3h",
            });

            // set a cookie with the token
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 3 hours
                maxAge: 3 * 60 * 60 * 1000, // 3 hours
            });

            res.json({ message: "login successful", token });

        } catch (error)
         {
            res.status(500).json({ message: error.message });
        }
    },

    // get current logged in user
    getCurrentUser: async (req, res) => {
        try {
            // get the user id from the request
            const userId = req.userId;
            
            // find the user by id
            const user = await User.findById(userId).select("-passwordHash -__v -_id");

            // check if the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // return the user data
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update the current user
    updateCurrentUser: async (req, res) => {
        try {
            // get the user id from the request
            const userId = req.userId;

            // get the user data from the request body
            const { username, name, location } = req.body;
            
            // find the user by id
            const user = await User.findById(userId)

            // check if the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // update the user data
            user.username = username || user.username;
            user.name = name || user.name;
            user.location = location || user.location;

            // save the updated user to the database
            const updatedUser = await user.save();

            // return the updated user data
            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // delete the current user
    deleteCurrentUser: async (req, res) => {
        try {
            // get the user id from the request
            const userId = req.userId;

            // find the user by id and delete it
            const deletedUser = await User.findByIdAndDelete(userId);

            // check if the user exists
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }


            // return the deleted user data
            res.status(200).json({ message: "User deleted successfully", user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // logout the user
    logout: async (req, res) => {
        try {
            // clear the cookie
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get all users
    getAllUsers: async (req, res) => {
        try {
            // find all users in the database
            const users = await User.find().select("-passwordHash -__v -_id");

            // return the users data
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get user by id Admin
    getUserByIdAdmin: async (req, res) => {
        try {
            // get the user id from the request params
            const userId = req.params.id;
            
            // find the user by id
            const user = await User.findById(userId).select("-passwordHash -__v -_id");
            
            // check if the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // return the user data
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // update user by id Admin
    updateUserByIdAdmin: async (req, res) => {
        try {
            // get the user id from the request
            const userId = req.params.id;

            // get the user data from the request body
            const { username, name, location } = req.body;
            
            // find the user by id
            const user = await User.findById(userId)

            // check if the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // update the user data
            user.username = username || user.username;
            user.name = name || user.name;
            user.location = location || user.location;

            // save the updated user to the database
            const updatedUser = await user.save();

            // return the updated user data
            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // delete user by id Admin
    deleteUserByIdAdmin: async (req, res) => {
        try {
            // get the user id from the request params
            const userId = req.params.id;

            // find the user by id and delete it
            const deletedUser = await User.findByIdAndDelete(userId);

            // check if the user exists
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // return the deleted user data
            res.status(200).json({ message: "User deleted successfully", user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

}

module.exports = usercontroller;