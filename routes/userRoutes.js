// import the express module
const express = require("express");

// import the user controller
const userController = require("../controllers/usercontroller");

// import the express router
const userRouter = express.Router();

// define the endpoint
userRouter.post("/", userController.register);

// export the user router
module.exports = userRouter;