// importing the required modules
const job = require('../models/job');
const User = require('../models/user');
const Company = require('../models/company');

// create the job controller
const jobController = {
    // create job function
    createJob: async (req, res) => {
        try {
            // get the job data from the request body
            const { title, description, location, type, companyId } = req.body;
            // check if the job already exists
            const jobExists = await job.findOne({ title });
            if (jobExists) {
                return res.status(400).json({ message: "Job already exists" });
            }
            // check if the company exists
            const company = await Company.findById(companyId);
            if (!company) {
                return res.status(400).json({ message: "Company not found" });
            }
            // get the user id from the request
            const { userId } = req;
            // check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            // create a new job
            const newJob = new job({
                title,
                description,
                location,
                type,
                companyId,
                createdBy: userId
            });
            // save the job to the database
            const savedJob = await newJob.save();

            // push the job id to the company jobs array

            company.jobs.push(savedJob._id);
            await company.save();

            // return the saved job
            res.status(201).json({ message: "Job Created Successfully", job: savedJob });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get all jobs function
    getAllJobs: async (req, res) => {
        try {
            // get all jobs from the database
            const jobs = await job.find().populate('companyId', 'name location');
            // return the jobs
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get job by id function
    getJobById: async (req, res) => {
        try {
            // get the job id from the request params
            const { id } = req.params;
            // find the job by id
            const jobFound = await job.findById(id);
            if (!jobFound) {
                return res.status(404).json({ message: "Job not found" });
            }
            // return the job
            res.status(200).json(jobFound);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // update job by id function
    updateJobById: async (req, res) => {
        try {
            // get the job id from the request params
            const { id } = req.params;
            // find the job by id
            const jobFound = await job.findById(id);
            if (!jobFound) {
                return res.status(404).json({ message: "Job not found" });
            }
            // update the job with the new data
            const updatedJob = await job.findByIdAndUpdate(id, req.body, { new: true });
            // return the updated job
            res.status(200).json({ message: "Job Updated Successfully", job: updatedJob });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // delete job by id function
    deleteJobById: async (req, res) => {
        try {
            // get the job id from the request params
            const { id } = req.params;
            // find the job by id
            const jobFound = await job.findById(id);
            if (!jobFound) {
                return res.status(404).json({ message: "Job not found" });
            }
            // delete the job
            await job.findByIdAndDelete(id);
            // return a success message
            res.status(200).json({ message: "Job Deleted Successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // apply job function
    applyJob: async (req, res) => {
        try {
            // get the job id from the request params
            const { id } = req.params;
            // find the job by id
            const jobFound = await job.findById(id);
            if (!jobFound) {
                return res.status(404).json({ message: "Job not found" });
            }
            // get the user id from the request
            const { userId } = req;
            // check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            // check if the user has already applied for the job
            if (jobFound.applicants.includes(userId)) {
                return res.status(400).json({ message: "You have already applied for this job" });
            }
            // push the user id to the job applied users array
            jobFound.applicants.push(userId);
            await jobFound.save();
            // return a success message
            res.status(200).json({ message: "Job Applied Successfully", jobFound });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // View all applied jobs
    getAppliedJobs: async (req, res) => {
        try {
            // get the user id from the request
            const { userId } = req;
            console.log("User ID:", userId);
            // check if the user exists
            const user = await User.findById(userId);
            console.log("user:", user);

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            // find all jobs that the user has applied for
            const appliedJobs = await job.find({ applicants: userId })
            // return the applied jobs
            res.status(200).json(appliedJobs);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

// export the job controller
module.exports = jobController;