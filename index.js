const mongoose = require('mongoose');
const express = require('express');
const config = require('./utlis/config');



mongoose.connect(config.mongodb_url).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => { 
    console.log('MongoDB connection failed', err);
})
