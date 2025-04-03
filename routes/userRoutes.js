// import the express module
const express = require("express");
// import the authentication middleware
const auth = require("../middleware/auth");

// import the user controller
const userController = require("../controllers/usercontroller");

// import the express router
const userRouter = express.Router();

// define the endpoint
userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);

// authenticate the routes
userRouter.get("/getUser", auth.isAuth, userController.getCurrentUser);
userRouter.put("/getUser", auth.isAuth, userController.updateCurrentUser);
userRouter.delete("/getUser", auth.isAuth, userController.deleteCurrentUser);
userRouter.get("/logout", userController.logout);

// admin routes
userRouter.get("/", auth.isAdmin, userController.getAllUsers);
userRouter.get("/getUser/:id", auth.isAdmin, userController.getUserByIdAdmin);
userRouter.put("/getUser/:id", auth.isAdmin, userController.updateUserByIdAdmin);
userRouter.delete("/getUser/:id", auth.isAdmin, userController.deleteUserByIdAdmin);


// export the user router
module.exports = userRouter;