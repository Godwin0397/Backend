// import the modules
const express = require("express");
const jobRouter = express.Router();
const jobController = require("../controllers/jobcontroller");
const auth = require("../middleware/auth");

// define the job routes
jobRouter.post("/", auth.isAuth, auth.isAdmin, jobController.createJob);
jobRouter.get("/", auth.isAuth, jobController.getAllJobs);

jobRouter.get("/appliedJobs", auth.isAuth, jobController.getAppliedJobs);

jobRouter.get("/:id", auth.isAuth, jobController.getJobById);
jobRouter.put("/:id", auth.isAuth, auth.isAdmin, jobController.updateJobById);
jobRouter.delete("/:id", auth.isAuth, auth.isAdmin, jobController.deleteJobById);

jobRouter.post("/apply/:id", auth.isAuth, jobController.applyJob);



// export the job router
module.exports = jobRouter;