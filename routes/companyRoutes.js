// import express
const express = require("express");
const companyRouter = express.Router();
const companyController = require("../controllers/companycontroller");
const auth = require("../middleware/auth");


// define the company routes
companyRouter.post("/", auth.isAuth, auth.isAdmin, companyController.createCompany);
companyRouter.get("/", auth.isAuth, auth.isAdmin, companyController.getAllCompanies);
companyRouter.get("/:id", auth.isAuth, auth.isAdmin, companyController.getCompanyById);
companyRouter.put("/:id", auth.isAuth, auth.isAdmin, companyController.updateCompanyById);
companyRouter.delete("/:id", auth.isAuth, auth.isAdmin, companyController.deleteCompanyById);

// export the company router
module.exports = companyRouter;