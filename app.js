const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



// import the user routes
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// use express json middleware
app.use(express.json());

const allowedOrigins = ['http://localhost:3001', 'http://localhost:5173', 'https://backend-s4v5.onrender.com', 'https://your-production-site.com'];


// use cors middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow the origin if it matches one in the allowedOrigins array
      callback(null, true);
    } else {
      // Deny the request if the origin is not allowed
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
}));

// use cookie parser middleware
app.use(cookieParser());

// use morgan middleware for logging
app.use(morgan('dev'));


// define the endpoint
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/jobs', jobRouter);

module.exports = app;