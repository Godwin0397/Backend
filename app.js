const express = require('express');

// import the user routes
const userRouter = require('./routes/userRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// use express json middleware
app.use(express.json());

// define the endpoint
app.use('/api/users', userRouter);

module.exports = app;