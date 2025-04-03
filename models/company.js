const mongoose = require('mongoose');

// define the company schema
const companySchema = new mongoose.Schema({
    name: "string",
    location: "string",
    date: {
        type: "date",
        default: Date.now
    },
    status: {
        type: "string",
        enum: ["active", "inactive"],
        default: "active"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

// export the company model
module.exports = mongoose.model("Company", companySchema, "companies");