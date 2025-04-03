const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



// import the user routes
const userRouter = require('./routes/userRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// use express json middleware
app.use(express.json());

// use cors middleware
app.use(cors({
  origin: 'http://localhost:3001', // replace with your client URL
  credentials: true,
}));

// use cookie parser middleware
app.use(cookieParser());

// use morgan middleware for logging
app.use(morgan('dev'));


// define the endpoint
app.use('/api/users', userRouter);

module.exports = app;