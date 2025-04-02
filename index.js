// importing the required modules
const mongoose = require("mongoose");
const config = require("./utlis/config");
const app = require("./app");

// setting the mongoDB connection string
mongoose
  .connect(config.mongodb_url)
  .then(() => {
    console.log("MongoDB connected successfully");
    // starting the server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
