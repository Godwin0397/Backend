// import mongoose from 'mongoose';

const mongoose = require('mongoose');

// define the job schema
const JobSchema = new mongoose.Schema({
    title: "String",
    description: "String",
    location: "String",
    date: {
        type: "Date",
        default: Date.now,
    },
    status: {
        type: "String",
        enum: ["open", "closed"],
        default: "open",
    },
    type: {
        type: "String",
        enum: ["full-time", "part-time", "contract"],
        default: "full-time",
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});