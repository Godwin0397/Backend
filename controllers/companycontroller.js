// import company model
const Company = require("../models/company");

// import the required modules
const User = require("../models/user");

// define the company controller
const companyController = {
    // create company function
    createCompany: async (req, res) => {
        try {
            // get the company data from the request body
            const { name, location } = req.body;
            // check if the company already exists
            const company = await Company.findOne({ name });
            if (company) {
                return res.status(400).json({ message: "Company already exists" });
            }

            // get the user id from the request
            const { userId } = req;
            // check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            // create a new company
            const newCompany = new Company({
                name,
                location,
                createdBy: userId
            });

            // save the company to the database    
            const savedCompany = await newCompany.save();
            
            // return the saved company
            res.status(201).json({ message: "Company Created Successfully", company: savedCompany });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get all companies function
    getAllCompanies: async (req, res) => {
        try {
            // get all companies from the database
            const companies = await Company.find();
            // return the companies
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // get company by id function
    getCompanyById: async (req, res) => {
        try {
            // get the company id from the request params
            const { id } = req.params;
            // find the company by id
            const company = await Company.findById(id);
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            // return the company
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // update company by id function
    updateCompanyById: async (req, res) => {
        try {
            // get the company id from the request params
            const { id } = req.params;
            
            // find the company by id and update it
            const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCompany) {
                return res.status(404).json({ message: "Company not found" });
            }
            // return the updated company
            res.status(200).json({ message: "Company updated successfully" ,updatedCompany});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // delete company by id function
    deleteCompanyById: async (req, res) => {
        try {
            // get the company id from the request params
            const { id } = req.params;
            // find the company by id and delete it
            const deletedCompany = await Company.findByIdAndDelete(id);
            if (!deletedCompany) {
                return res.status(404).json({ message: "Company not found" });
            }
            // return the deleted company
            res.status(200).json({ message: "Company deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// export the company controller
module.exports = companyController;